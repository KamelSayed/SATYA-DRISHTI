from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl, validator
from src.services.universal_dispatcher import UniversalAnalysisDispatcher
from src.routers.governance import SourceVerification, MultilingualProcessor, GovernanceReporter, update_governance_stats
from src.database.mongodb import mongodb
import re

router = APIRouter(prefix="/analyze", tags=["analysis"])

class AnalyzeRequest(BaseModel):
    url: str
    deep_analysis: bool = False
    
    @validator('url')
    def validate_url(cls, v):
        if not v or not v.strip():
            raise ValueError('URL cannot be empty')
        
        # Basic URL pattern validation
        url_pattern = re.compile(
            r'^https?://'
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'
            r'localhost|'
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'
            r'(?::\d+)?'
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        
        if not url_pattern.match(v):
            raise ValueError('Invalid URL format')
        
        return v

@router.post("/")
async def analyze_content(request: AnalyzeRequest):
    try:
        dispatcher = UniversalAnalysisDispatcher()
        result = await dispatcher.analyze(request.url, request.deep_analysis)
        
        # Add governance features
        if result.get("status") == "completed":
            # Source verification
            text_content = result.get("text_preview", "")
            source_verification = SourceVerification.verify_source(request.url, text_content)
            result["source_verification"] = source_verification
            
            # Language detection
            language_info = MultilingualProcessor.get_language_info(text_content)
            result["language_analysis"] = language_info
            
            # Update governance stats
            await update_governance_stats(result)
            
            # Auto-generate report for all analyses
            cybercell_report = GovernanceReporter.generate_cybercell_report(result)
            result["cybercell_report"] = cybercell_report
            
            # Save report to MongoDB
            report_id = await mongodb.save_report(cybercell_report)
            if report_id:
                result["cybercell_report"]["_id"] = str(report_id)
            
            # Save analysis to MongoDB
            analysis_id = await mongodb.save_analysis(result)
            if analysis_id:
                result["_id"] = str(analysis_id)
            
            # Update MongoDB stats
            await mongodb.increment_stat("total_analyzed")
            if result.get("risk_assessment", {}).get("level") in ["HIGH", "CRITICAL"]:
                await mongodb.increment_stat("high_risk_detected")
        
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

class ReportSchema(BaseModel):
    telegram_id: int
    report_date: str
    shift: str
    report_location: str
    duty_start: str
    duty_end: str
    service_checks: list
    activities: str
    problems: str | None = None
    pending_tasks: str | None = None
    comments: str | None = None
    activities_checklist: list | None = []

@app.post("/api/submit_report")
async def submit_report(report: ReportSchema):
    # Verify employee exists and is active in Supabase
    emp_res = supabase.table("employees").select("*").eq("telegram_id", report.telegram_id).execute()
    if not emp_res.data or not emp_res.data[0].get("active"):
        raise HTTPException(status_code=403, detail="Account not approved.")
    
    employee = emp_res.data[0]

    # Format service summary and activities
    service_summary = "\n".join(
        f"{item['name']}: {item['status']}"
        for item in report.service_checks
    ) or "None selected"

    formatted_activities = (
        f"SHIFT: {report.shift}\n\n"
        f"SERVICE CHECKLIST:\n{service_summary}\n\n"
        f"ACTIVITIES:\n{report.activities}"
    )

    # Insert into Supabase daily_reports table
    result = supabase.table("daily_reports").insert({
        "report_date": report.report_date,
        "employee_id": employee["id"],
        "duty_start": report.duty_start,
        "duty_end": report.duty_end,
        "shift": report.shift,
        "report_location": report.report_location,
        "activities": formatted_activities,
        "problems": report.problems,
        "pending_tasks": report.pending_tasks,
        "comments": report.comments,
        "activities_checklist": report.activities_checklist,
        "review_status": "pending",
    }).execute()

    return {"success": True, "message": "Report saved successfully."}

# License: GNU General Public License v3.0

import requests
from fastapi import APIRouter, Request, UploadFile, File
from fastapi.responses import JSONResponse

from workers.chargen import CharGen

router = APIRouter()

@router.post("/video")
async def video(request: Request):
    try:
        return JSONResponse({ "success": True })
    except Exception as e:
        return JSONResponse({ "success": False, "message": f"Error: {e}"})


@router.post("/evaluation")
async def evaluation(request: Request):
    try:
        result = CharGen()
        return JSONResponse(result)
    except Exception as e:
        return JSONResponse({ "success": False, "message": f"Error: {e}"})


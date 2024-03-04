# License: GNU General Public License v3.0

import requests
from fastapi import APIRouter, Request, UploadFile, File
from fastapi.responses import JSONResponse

from workers.model import SigninModel, SignupModel

router = APIRouter()

@router.post("/signin")
async def signin(request: Request, data: SigninModel):
    try:
        return JSONResponse({ "success": True })
    except Exception as e:
        return JSONResponse({ "success": False, "message": f"Error: {e}"})


@router.post("/signup")
async def signup(request: Request, data: SignupModel):
    try:
        return JSONResponse({ "success": True })
    except Exception as e:
        return JSONResponse({ "success": False, "message": f"Error: {e}"})
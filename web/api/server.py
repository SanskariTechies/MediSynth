# License: GNU General Public License v3.0
import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import router.description_route as description_route
from config import *
import router.auth_router as auth_router
import router.model_router as model_router
import router.video_router as video_router
import router.evaluation_route as evaluation_route
app = FastAPI(
    title="MediSynth",
    description="This is an application as a service to help our MediSynth application.",
    version="0.0.1",
    license_info={
        "name": "GNU GENERAL PUBLIC License v3.0",
        "url": "https://www.gnu.org/licenses/gpl-3.0.en.html",
    },
    docs_url="/tester",
    redoc_url="/",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the static files directory
@app.mount("/output", StaticFiles(directory="output"), name="output")

@app.get("/")
async def home():
    return JSONResponse({ "success": True })

app.include_router(auth_router.router, prefix="/api/v1/auth")
app.include_router(model_router.router, prefix="/api/v1/model")
app.include_router(video_router.router, prefix="/api/v1/video")
app.include_router(evaluation_route.router, prefix="/api/v1/evaluate")
app.include_router(description_route.router, prefix="/api/v1/description")

if __name__ == "__main__":
    try:
        print('------------------- Initalizing Web Server -------------------')
        print('----------------------- Service Started -----------------------')
        uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
    except KeyboardInterrupt:
        print('----------------------- Service Stopped -----------------------')
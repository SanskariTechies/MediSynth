# License: GNU General Public License v3.0

import requests
from fastapi import APIRouter, Request, UploadFile, File
from fastapi.responses import JSONResponse
import random
from workers.chargen import CharGen
import pandas as pd
router = APIRouter()

dataset = pd.read_csv("symptoms.csv")

def get_random_symptoms():
    random_row_index = random.randint(0, len(dataset) - 1)
    random_details = dataset.iloc[random_row_index].to_dict()

    symptoms = []
    blood_pressure = ""
    cholesterol_level = ""
    for key, value in random_details.items():
        if key.lower() not in ['disease', 'gender', 'outcome variable', 'age']:
            if key.lower() == 'blood pressure':
                blood_pressure = str(value).capitalize()
            elif key.lower() == 'cholesterol level':
                cholesterol_level = str(value).capitalize()
            elif str(value).lower() != "no":  
                symptoms.append(key)
    if blood_pressure:
        symptoms.append(f"Blood Pressure is {blood_pressure}")
    if cholesterol_level:
        symptoms.append(f"Cholesterol Level is {cholesterol_level}")

    return symptoms

def generate_random_name():
    random_names = ["Akkil", "Saiesh", "Ashish", "Rakshita", "Emma"]
    return random.choice(random_names)

@router.post("/video")
async def video(request: Request):
    try:
        return JSONResponse({ "success": True })
    except Exception as e:
        return JSONResponse({ "success": False, "message": f"Error: {e}"})


@router.post("/evaluation")
async def evaluation(request: Request):
    try:
        random_name = generate_random_name()
        random_symptoms = get_random_symptoms()
        symptoms_str = ", ".join(random_symptoms)
        output_string = f"Hello, my name is {random_name} and my symptoms are {symptoms_str}."
        result = CharGen(output_string)
        return JSONResponse(result)
    except Exception as e:
        return JSONResponse({ "success": False, "message": f"Error: {e}"})


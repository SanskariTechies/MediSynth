# License: GNU General Public License v3.0

import requests
from fastapi import APIRouter, Request, UploadFile, File
from fastapi.responses import JSONResponse
import pandas as pd
from workers.chargen import CharGen
import random

router = APIRouter()

dataset = pd.read_csv("Data/symptoms.csv")

def get_random_symptoms():
    
    random_row_index = random.randint(0, len(dataset) - 1)
    random_details = dataset.iloc[random_row_index].to_dict()
    disease_name = random_details['Disease']
    symptoms = []
    blood_pressure = ""
    cholesterol_level = ""
    for key, value in random_details.items():
        if key.lower() not in ['disease', 'gender', 'outcome variable', 'age']:
            if key.lower() == 'blood pressure':
                blood_pressure = str(value).capitalize()
            elif key.lower() == 'cholesterol level':
                cholesterol_level = str(value).capitalize()
            elif str(value).lower() != "no":  # For other symptoms, consider if not "No"
                symptoms.append(key)
    if blood_pressure:
        symptoms.append(f"Blood Pressure is {blood_pressure}")
    if cholesterol_level:
        symptoms.append(f"Cholesterol Level is {cholesterol_level}")

    return disease_name,symptoms


def generate_random_name():
    random_names = ["Rakshita", "Emma", "Deepika", "Shradha", "Soniya", "Sowmya"]
    return random.choice(random_names)


@router.get("/pre-evaluation")
async def evaluation(request: Request):
    # try:
        random_name = generate_random_name()
        disease_name, random_symptoms = get_random_symptoms()
        symptoms_str = ", ".join(random_symptoms)
        output_string = f"Hello, my name is {random_name} and my symptoms are {symptoms_str}."
        print(output_string)
        result = CharGen(output_string)
        if result['success']:
            result['diesase'] = disease_name
        return JSONResponse(result)
    # except Exception as e:
    #     return JSONResponse({ "success": False, "message": f"Error: {e}"})


from fastapi import FastAPI,APIRouter
from pydantic import BaseModel, Field
import joblib
import pandas as pd

router = APIRouter()


data = pd.read_csv('Data/concatenated_dataset.csv')
X = pd.get_dummies(data['disease'])
y = data['drug']

classifier = joblib.load('models/medicine_prediction_model.joblib')

class Input(BaseModel):
    disease: str
    medicine: str


@router.post("/evaluate")
async def predict_medicine(input: Input):
    # Predict the medicine for the provided disease
    disease = input.disease
    disease_encoded = pd.get_dummies(pd.Series(disease)).reindex(columns=X.columns, fill_value=0)
    predicted_medicine = classifier.predict(disease_encoded)[0].split('/')

    # Check if the input medicine name is part of the list of predicted medicines
    is_valid = input.medicine in predicted_medicine

    return is_valid
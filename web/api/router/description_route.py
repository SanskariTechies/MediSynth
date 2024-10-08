from fastapi import FastAPI,APIRouter
from pydantic import BaseModel
import joblib
import pandas as pd


router=APIRouter()

# Load the dataset
data = pd.read_csv('Data/med.csv',encoding='cp1252')
X = pd.get_dummies(data['Medicine name'])
y = data['medicine description']

# Load the pre-trained model
classifier = joblib.load('models/evaluation_prediction_model2.joblib')

class MedicineInput(BaseModel):
    medicine: str

@router.post("/predict_description")
async def predict_decription(medicine_input: MedicineInput):
    # Encode the input disease
    disease_encoded = pd.get_dummies(pd.Series(medicine_input.medicine)).reindex(columns=X.columns, fill_value=0)
    medicine = classifier.predict(disease_encoded)[0]
    return {"medicine": medicine}

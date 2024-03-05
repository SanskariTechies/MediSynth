from fastapi import FastAPI, APIRouter
from pydantic import BaseModel, Field
import joblib
import pandas as pd

app = FastAPI()

# Load the dataset
data = pd.read_csv('Data/concatenated_dataset.csv')
X = pd.get_dummies(data['disease'])
y = data['drug']

# Load the pre-trained model
classifier = joblib.load('models/medicine_prediction_model.joblib')

class DiseaseInput(BaseModel):
    disease: str

class MedicineInput(BaseModel):
    medicine: str

router = APIRouter()

@router.post("/predict_medicine/")
async def predict_medicine(disease_input: DiseaseInput, medicine_input: MedicineInput):

    disease = disease_input.disease
    disease_encoded = pd.get_dummies(pd.Series(disease)).reindex(columns=X.columns, fill_value=0)
    predicted_medicine = classifier.predict(disease_encoded)[0].split('/')

    is_valid = medicine_input.medicine in predicted_medicine

    return is_valid

app.include_router(router)
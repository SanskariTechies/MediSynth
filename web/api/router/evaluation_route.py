from fastapi import FastAPI,APIRouter
from pydantic import BaseModel
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

router=APIRouter()
@router.post("/predict_medicine/")
async def predict_medicine(disease_input: DiseaseInput):
    # Encode the input disease
    disease_encoded = pd.get_dummies(pd.Series(disease_input.disease)).reindex(columns=X.columns, fill_value=0)
    print("success")
    # Predict the medicine
    medicine = classifier.predict(disease_encoded)[0].split('/')
    
    return {"medicine": medicine}

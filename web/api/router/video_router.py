import pandas as pd
import random
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from sklearn.preprocessing import LabelEncoder
import numpy as np

router = APIRouter()

dataset = pd.read_csv("Data/dataset.csv")
model = load_model('models/my_disease_prediction_model.h5')
label_encoder = LabelEncoder()
label_encoder.classes_ = np.array([
    '(vertigo) Paroymsal  Positional Vertigo', 'AIDS', 'Acne',
    'Alcoholic hepatitis', 'Allergy', 'Arthritis', 'Bronchial Asthma',
    'Cervical spondylosis', 'Chicken pox', 'Chronic cholestasis', 'Common Cold',
    'Dengue', 'Diabetes ', 'Dimorphic hemmorhoids(piles)', 'Drug Reaction',
    'Fungal infection', 'GERD', 'Gastroenteritis', 'Heart attack', 'Hepatitis B',
    'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Hypertension ', 'Hyperthyroidism',
    'Hypoglycemia', 'Hypothyroidism', 'Impetigo', 'Jaundice', 'Malaria', 'Migraine',
    'Osteoarthristis', 'Paralysis (brain hemorrhage)', 'Peptic ulcer diseae', 'Pneumonia',
    'Psoriasis', 'Tuberculosis', 'Typhoid', 'Urinary tract infection', 'Varicose veins', 'hepatitis A'
])

def preprocess_sample_data(symptoms, all_symptoms):

    sample_data = [1 if symptom in symptoms else 0 for symptom in all_symptoms]
    
    return np.array([sample_data])

def get_random_symptoms():
    random_row_index = random.randint(0, len(dataset) - 1)
    
    random_details = dataset.iloc[random_row_index].to_dict()
    
    symptoms = []
    
    for key, value in random_details.items():
        if key.lower() != 'disease' and pd.notna(value) and value.strip() not in ['No', 'nan', '']:
            symptoms.append(str(value).strip())
    
    print(symptoms)
    return symptoms

def generate_random_name():
    random_names = ["Rakshita", "Emma", "Deepika", "Shradha", "Soniya", "Sowmya"]
    return random.choice(random_names)

@router.get("/pre-evaluation")
async def evaluation(request: Request):
    try:
        random_name = generate_random_name()
        random_symptoms = get_random_symptoms()
        symptoms_str = ", ".join(random_symptoms)
        

        all_symptoms = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'dischromic _patches', 'continuous_sneezing', 
    'shivering', 'chills', 'watering_from_eyes', 'stomach_pain', 'acidity', 
    'ulcers_on_tongue', 'vomiting', 'cough', 'chest_pain', 'yellowish_skin', 
    'nausea', 'loss_of_appetite', 'abdominal_pain', 'yellowing_of_eyes', 'burning_micturition', 
    'spotting_ urination', 'passage_of_gases', 'internal_itching', 'indigestion', 'muscle_wasting', 
    'patches_in_throat', 'high_fever', 'extra_marital_contacts', 'fatigue', 'weight_loss', 
    'restlessness', 'lethargy', 'irregular_sugar_level', 'blurred_and_distorted_vision', 'obesity', 
    'excessive_hunger', 'increased_appetite', 'polyuria', 'sunken_eyes', 'dehydration', 
    'diarrhoea', 'breathlessness', 'family_history', 'mucoid_sputum', 'headache', 
    'dizziness', 'loss_of_balance', 'lack_of_concentration', 'stiff_neck', 'depression', 
    'irritability', 'visual_disturbances', 'back_pain', 'weakness_in_limbs', 'neck_pain', 
    'weakness_of_one_body_side', 'altered_sensorium', 'dark_urine', 'sweating', 'muscle_pain', 
    'mild_fever', 'swelled_lymph_nodes', 'malaise', 'red_spots_over_body', 'joint_pain', 
    'pain_behind_the_eyes', 'constipation', 'toxic_look_(typhos)', 'belly_pain', 'yellow_urine', 
    'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 
    'acute_liver_failure', 'swelling_of_stomach', 'distention_of_abdomen', 'history_of_alcohol_consumption', 
    'fluid_overload', 'phlegm', 'blood_in_sputum', 'throat_irritation', 'redness_of_eyes', 
    'sinus_pressure', 'runny_nose', 'congestion', 'loss_of_smell', 'fast_heart_rate', 
    'rusty_sputum', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 
    'irritation_in_anus', 'cramps', 'bruising', 'swollen_legs', 'swollen_blood_vessels', 
    'prominent_veins_on_calf', 'weight_gain', 'cold_hands_and_feets', 'mood_swings', 'puffy_face_and_eyes', 
    'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'abnormal_menstruation', 'muscle_weakness', 
    'anxiety', 'slurred_speech', 'palpitations', 'drying_and_tingling_lips', 'knee_pain', 
    'hip_joint_pain', 'swelling_joints', 'painful_walking', 'movement_stiffness', 'spinning_movements', 
    'unsteadiness', 'pus_filled_pimples', 'blackheads', 'scurring', 'bladder_discomfort', 
    'foul_smell_of urine', 'continuous_feel_of_urine', 'skin_peeling', 'silver_like_dusting', 
    'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze'
        ]
        
        sample_data = preprocess_sample_data(random_symptoms, all_symptoms)
        prediction = model.predict(sample_data)
        predicted_class = label_encoder.classes_[np.argmax(prediction)]
        
        output_string = f"Hello, my name is {random_name} and my symptoms are {symptoms_str}"
        print(output_string)
        print(predicted_class)
        disease_name=predicted_class
        return disease_name,output_string
        
    except Exception as e:
        return JSONResponse({"success": False, "message": f"Error: {e}"})

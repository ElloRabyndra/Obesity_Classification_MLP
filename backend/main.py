from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import tensorflow as tf
import joblib
import json
import os

app = FastAPI(title="Obesity Prediction API")

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for models and preprocessors
model = None
scaler = None
le_target = None
le_caec = None
le_calc = None
feature_columns = None

# Input Data Schema
class PredictionRequest(BaseModel):
    Gender: str
    Age: float
    Height: float
    Weight: float
    family_history_with_overweight: str
    FAVC: str
    FCVC: float
    NCP: float
    CAEC: str
    SMOKE: str
    CH2O: float
    SCC: str
    FAF: float
    TUE: float
    CALC: str
    MTRANS: str

@app.on_event("startup")
async def load_artifacts():
    global model, scaler, le_target, le_caec, le_calc, feature_columns
    try:
        base_dir = os.path.dirname(__file__)
        model = tf.keras.models.load_model(os.path.join(base_dir, 'model.keras'))
        scaler = joblib.load(os.path.join(base_dir, 'scaler.pkl'))
        le_target = joblib.load(os.path.join(base_dir, 'label_encoder.pkl'))
        le_caec = joblib.load(os.path.join(base_dir, 'le_caec.pkl'))
        le_calc = joblib.load(os.path.join(base_dir, 'le_calc.pkl'))
        
        with open(os.path.join(base_dir, 'feature_columns.json'), 'r') as f:
            feature_columns = json.load(f)
            
        print("All ML artifacts loaded successfully.")
    except Exception as e:
        print(f"Error loading artifacts: {str(e)}")

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Obesity Prediction API is running"}

@app.post("/predict")
async def predict(data: PredictionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model artifacts are not loaded.")

    try:
        # Convert input to DataFrame
        input_data = data.dict()
        df = pd.DataFrame([input_data])

        # Binary Encoding
        binary_cols = ['family_history_with_overweight', 'FAVC', 'SMOKE', 'SCC']
        for col in binary_cols:
            df[col] = df[col].map({'yes': 1, 'no': 0})

        # Label Encoding
        # Handle unseen labels just in case by falling back or try/except, but assuming exact match
        df['CAEC'] = le_caec.transform(df['CAEC'])
        df['CALC'] = le_calc.transform(df['CALC'])

        # One-hot encoding for Gender and MTRANS
        df = pd.get_dummies(df, columns=['Gender', 'MTRANS'], drop_first=False)

        # Align columns with training data
        # Add missing columns with 0
        for col in feature_columns:
            if col not in df.columns:
                df[col] = 0
                
        # Keep only the columns present in training, in the exact same order
        df = df[feature_columns]

        # Ensure numeric values
        X = df.astype(np.float32)

        # Normalization
        X_scaled = scaler.transform(X)

        # Prediction
        probabilities = model.predict(X_scaled)[0]
        predicted_class_idx = np.argmax(probabilities)
        predicted_class_name = le_target.inverse_transform([predicted_class_idx])[0]

        # Prepare probability dictionary
        prob_dict = {
            class_name: float(prob) 
            for class_name, prob in zip(le_target.classes_, probabilities)
        }

        return {
            "kelas": predicted_class_name,
            "probabilitas": prob_dict
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

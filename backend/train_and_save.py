import os
import json
import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
import joblib

# Set random seed for reproducibility
np.random.seed(42)
tf.random.set_seed(42)

def main():
    print("Loading data...")
    data_path = os.path.join(os.path.dirname(__file__), '../data/ObesityDataSet_raw_and_data_sinthetic.csv')
    df = pd.read_csv(data_path)

    print("Preprocessing data...")
    # Binary Encoding
    binary_cols = ['family_history_with_overweight', 'FAVC', 'SMOKE', 'SCC']
    for col in binary_cols:
        df[col] = df[col].map({'yes': 1, 'no': 0})

    # Label Encoding CAEC and CALC
    le_caec = LabelEncoder()
    df['CAEC'] = le_caec.fit_transform(df['CAEC'])

    le_calc = LabelEncoder()
    df['CALC'] = le_calc.fit_transform(df['CALC'])

    # Target encoding
    le_target = LabelEncoder()
    df['NObeyesdad'] = le_target.fit_transform(df['NObeyesdad'])

    # One-hot encoding for Gender and MTRANS
    df = pd.get_dummies(df, columns=['Gender', 'MTRANS'], drop_first=False)

    # Split features and target
    X = df.drop('NObeyesdad', axis=1)
    y = df['NObeyesdad']

    # Ensure numeric values
    X = X.astype(np.float32)

    # Save feature columns to ensure consistent ordering during inference
    feature_columns = X.columns.tolist()
    with open('feature_columns.json', 'w') as f:
        json.dump(feature_columns, f)

    # Train-test split (80:20 stratified)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

    print("Scaling features...")
    # Normalization
    scaler = MinMaxScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Model configuration (Config B/D)
    num_classes = len(le_target.classes_)
    input_shape = (X_train_scaled.shape[1],)

    model = tf.keras.Sequential([
        tf.keras.layers.InputLayer(input_shape=input_shape),
        tf.keras.layers.Dense(256, activation='relu'),
        tf.keras.layers.Dropout(0.3),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(0.3),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])

    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    print("Training model...")
    # Train model
    model.fit(X_train_scaled, y_train, epochs=50, batch_size=32, validation_split=0.2, verbose=1)

    print("Evaluating model...")
    # Evaluate
    loss, accuracy = model.evaluate(X_test_scaled, y_test, verbose=0)
    print(f"\nFinal Test Accuracy: {accuracy:.4f}\n")

    print("Saving artifacts...")
    # Save artifacts
    model.save('model.keras')
    joblib.dump(scaler, 'scaler.pkl')
    joblib.dump(le_target, 'label_encoder.pkl')
    joblib.dump(le_caec, 'le_caec.pkl')
    joblib.dump(le_calc, 'le_calc.pkl')

    print("All artifacts saved successfully in 'backend' folder.")

if __name__ == "__main__":
    main()

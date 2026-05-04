# Obesity Level Prediction Web Application

This project is a final assignment for the Artificial Neural Networks course. The application utilizes a Multi-Layer Perceptron (MLP) model built with TensorFlow/Keras to predict an individual's obesity level based on 16 features (physical data, eating habits, lifestyle, and family history).

The application is divided into two main parts:
- **Frontend**: A responsive user interface built using React (Vite) and Tailwind CSS.
- **Backend**: A high-performance REST API built using FastAPI (Python) to perform model inference.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, React Hook Form, Lucide React, Axios.
- **Backend**: FastAPI, Uvicorn, TensorFlow, Scikit-Learn, Pandas, NumPy, Joblib.
- **Machine Learning**: Multi-Layer Perceptron (MLP) Neural Network.

## Directory Structure

```text
Obesity_Classification_MLP/
├── backend/                  # FastAPI source code & ML Pipeline
│   ├── main.py               # FastAPI entry point & /predict endpoint
│   ├── train_and_save.py     # Script to train MLP and save artifacts
│   ├── requirements.txt      # Python dependencies
│   └── Dockerfile            # Docker configuration for deployment
├── frontend/                 # React Vite source code
│   ├── src/                  # React components, API services, and styling
│   ├── package.json          # Node.js dependencies
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── .env.example          # Environment variables example (VITE_API_URL)
├── data/                     # Dataset (CSV)
├── main.ipynb                # Notebook to train the model
└── README.md                 # Project Documentation
```

## Setup and Installation Guide

Follow the steps below to run the project locally on your machine.

### 1. Generate ML Model (Backend)
First, we need to train the model from the dataset and save its scaler and encoders.

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. (Recommended) Create a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the training script:
   ```bash
   python train_and_save.py
   ```
   *This process will read the dataset, train the MLP model, and generate `model.keras`, `scaler.pkl`, `label_encoder.pkl`, and other artifacts inside the `backend` folder.*

### 2. Run Backend Server (FastAPI)
Once the model is generated, run the API server.

1. Ensure you are in the `backend` folder (and the virtual environment is active).
2. Start the server using uvicorn:
   ```bash
   uvicorn main:app --reload --host localhost --port 8000
   ```
3. The backend will be running at `http://localhost:8000`. 
   *(You can view the API documentation at `http://localhost:8000/docs`)*

### 3. Run Frontend Server (React)
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file (Optional if you change the backend port):
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local link shown in the terminal (usually `http://localhost:5173`) in your browser.

---

## Deployment Guide (Production)

### Deploying Backend to Railway
1. Push this repository to GitHub.
2. Log in to [Railway.app](https://railway.app/).
3. Create a new project: **New Project** -> **Deploy from GitHub repo**.
4. Select this project's repository.
5. (Important) If this is a monorepo, go to **Settings** -> **Root Directory** and change it to `/backend`.
6. Railway will read the `Dockerfile` and deploy the API automatically.
7. Go to the **Networking** tab and click **Generate Domain** to get the public URL (e.g., `https://backend-app.up.railway.app`).

### Deploying Frontend to Vercel
1. Log in to [Vercel.com](https://vercel.com/).
2. Create a new project by importing your GitHub repository.
3. During configuration, change the **Root Directory** to the `frontend` folder.
4. The Framework Preset will automatically detect **Vite**.
5. Open the **Environment Variables** options, add:
   - **Name**: `VITE_API_URL`
   - **Value**: Your Railway backend URL (e.g., `https://backend-app.up.railway.app`)
6. Click **Deploy** and wait for the process to complete.

---
*Disclaimer: This application is developed for academic and educational purposes. The obesity level prediction results cannot be used as a substitute for a diagnosis from a professional medical practitioner.*

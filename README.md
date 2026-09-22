# Chatbot Backend (Python + Flask)

This is the backend server for the Basic Rule-Based Chatbot project. It is built using Python, Flask, and Flask-CORS.

---

## 📁 Files in this Directory

- **`app.py`**: The main Flask web server. It sets up the server, enables CORS, validates incoming messages, and defines the `/chat` and `/health` routes.
- **`chatbot.py`**: The core chatbot logic containing `get_bot_response(message)`. It processes text using simple Python `if/elif/else` statements.
- **`requirements.txt`**: The list of Python libraries needed to run the backend (`Flask` and `flask-cors`).

---

## 🚀 Setup & Running (Windows)

Follow these steps from a terminal (PowerShell or Command Prompt):

### Step 1: Navigate to the `backend` folder
```powershell
cd basic-chatbot\backend
```

### Step 2: Create a virtual environment
A virtual environment isolates project dependencies so they do not conflict with other Python projects on your computer.
```powershell
python -m venv venv
```

### Step 3: Activate the virtual environment
```powershell
venv\Scripts\activate
```
*(You will see `(venv)` appear at the beginning of your terminal line).*

> **Note for PowerShell execution policy:** If you see an execution policy error when activating `venv`, run:
> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process` and try again.

### Step 4: Install dependencies
```powershell
pip install -r requirements.txt
```

### Step 5: Start the backend server
```powershell
python app.py
```

The server will start running at:
`http://127.0.0.1:5000`

---

## 🧪 Testing the Backend API

You can test the endpoints while `python app.py` is running.

### 1. Health Check (`GET /health`)
- **In your browser:** Open `http://127.0.0.1:5000/health`
- **In PowerShell:**
  ```powershell
  Invoke-RestMethod -Uri http://127.0.0.1:5000/health -Method GET
  ```
- **Expected Output:**
  ```json
  {
    "status": "ok"
  }
  ```

### 2. Chat Endpoint (`POST /chat`)
- **In PowerShell:**
  ```powershell
  Invoke-RestMethod -Uri http://127.0.0.1:5000/chat -Method POST -ContentType "application/json" -Body '{"message":"hello"}'
  ```
- **Expected Output:**
  ```json
  {
    "response": "Hi!"
  }
  ```

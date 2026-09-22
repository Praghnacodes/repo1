"""
app.py - Flask Web Server & API Endpoints

This file sets up a Flask web application, enables CORS so the frontend
webpage can communicate with it, and defines two API routes:
1. GET  /health -> Checks if the server is running properly.
2. POST /chat   -> Receives user messages and returns bot responses.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_bot_response

# 1. Initialize Flask application
app = Flask(__name__)

# 2. Enable Cross-Origin Resource Sharing (CORS)
# This allows our HTML frontend (which runs on a different port/file)
# to make requests to this backend without browser security blocks.
CORS(app)


# -----------------------------------------------------------------------------
# Health Check Route
# -----------------------------------------------------------------------------
@app.route('/health', methods=['GET'])
def health_check():
    """
    A simple endpoint to check if the server is alive and responding.
    Returns: JSON {"status": "ok"} with HTTP status code 200.
    """
    return jsonify({"status": "ok"}), 200


# -----------------------------------------------------------------------------
# Chat API Route
# -----------------------------------------------------------------------------
@app.route('/chat', methods=['POST'])
def chat():
    """
    Receives user messages in JSON format, processes them with get_bot_response(),
    and returns the bot's response in JSON format.

    Expected Request JSON:
        { "message": "hello" }

    Returned Response JSON (Success):
        { "response": "Hi!" }

    Returned Response JSON (Invalid Input):
        { "error": "Message cannot be empty." }
    """
    # 1. Read JSON data sent in the request body
    data = request.get_json(silent=True)

    # 2. Validate that valid JSON was received
    if not data or not isinstance(data, dict):
        return jsonify({"error": "Invalid request. Please send a JSON object with a 'message' field."}), 400

    # 3. Extract the 'message' field
    user_message = data.get("message")

    # 4. Validate that 'message' is present and not empty
    if user_message is None or not str(user_message).strip():
        return jsonify({"error": "Message cannot be empty."}), 400

    # 5. Get the response from our chatbot logic
    bot_reply = get_bot_response(str(user_message))

    # 6. Return the response as JSON with HTTP status 200 (OK)
    return jsonify({"response": bot_reply}), 200


# -----------------------------------------------------------------------------
# Main Entry Point
# -----------------------------------------------------------------------------
if __name__ == '__main__':
    # Starts the local development server at http://127.0.0.1:5000/
    print("Starting Flask Chatbot Server on http://127.0.0.1:5000 ...")
    app.run(host='127.0.0.1', port=5000, debug=True)

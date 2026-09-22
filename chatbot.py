"""
chatbot.py - Rule-Based Chatbot Logic

This module contains the core logic for generating bot responses.
It uses simple Python string methods and if/elif/else statements.
"""


def get_bot_response(message: str) -> str:
    """
    Takes a user message string and returns a predefined bot response string.
    
    1. .lower() converts the message to lowercase, so 'Hello', 'HELLO',
       and 'hello' are all treated the same.
    2. .strip() removes any accidental leading or trailing spaces.
    3. if/elif/else checks the cleaned text against known rules.
    """
    if not isinstance(message, str):
        return "Sorry, I don't understand that yet."

    # Normalize input: make it lowercase and trim extra spaces
    cleaned_message = message.lower().strip()

    # Rule 1: Greetings
    if cleaned_message in ["hello", "hi", "hey"]:
        return "Hi!"

    # Rule 2: Inquiring how the bot is doing
    elif cleaned_message == "how are you":
        return "I'm fine, thanks!"

    # Rule 3: Farewells
    elif cleaned_message in ["bye", "goodbye"]:
        return "Goodbye!"

    # Fallback: When the input does not match any known rule
    else:
        return "Sorry, I don't understand that yet."

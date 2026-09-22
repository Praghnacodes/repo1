/**
 * script.js - Frontend Client Logic
 * 
 * This file connects the HTML interface with the Python Flask backend.
 * It manages:
 *  1. User input events & enabling/disabling the Send button.
 *  2. Adding messages to the conversation area.
 *  3. Sending POST requests to http://127.0.0.1:5000/chat using fetch().
 *  4. Showing a loading indicator while waiting.
 *  5. Handling network or server errors gracefully.
 */

// -----------------------------------------------------------------------------
// 1. Select DOM (Document Object Model) Elements
// -----------------------------------------------------------------------------
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const typingIndicator = document.getElementById("typing-indicator");
const initialTimeEl = document.getElementById("initial-time");

// Backend API URL
const BACKEND_URL = "http://127.0.0.1:5000/chat";


// -----------------------------------------------------------------------------
// 2. Helper: Format Current Time (e.g. "08:35 PM")
// -----------------------------------------------------------------------------
function getCurrentTimeString() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Set timestamp for the initial welcome message
if (initialTimeEl) {
  initialTimeEl.textContent = getCurrentTimeString();
}


// -----------------------------------------------------------------------------
// 3. Helper: Append Message to Conversation Area
// -----------------------------------------------------------------------------
function appendMessage(sender, text, isError = false) {
  // Create outer row container
  const messageRow = document.createElement("div");
  messageRow.className = `message-row ${sender === "user" ? "user-row" : "bot-row"}`;

  // Create message bubble
  const bubble = document.createElement("div");
  bubble.className = `message-bubble ${
    sender === "user"
      ? "user-bubble"
      : isError
      ? "error-bubble"
      : "bot-bubble"
  }`;

  // Message content
  const content = document.createElement("div");
  content.className = "message-text";
  content.textContent = text; // Safe against HTML injection

  // Timestamp
  const time = document.createElement("div");
  time.className = "message-time";
  time.textContent = getCurrentTimeString();

  // Assemble elements
  bubble.appendChild(content);
  bubble.appendChild(time);
  messageRow.appendChild(bubble);
  chatMessages.appendChild(messageRow);

  // Auto-scroll to the newest message at the bottom
  scrollToBottom();
}


// -----------------------------------------------------------------------------
// 4. Helper: Auto-Scroll to Latest Message
// -----------------------------------------------------------------------------
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}


// -----------------------------------------------------------------------------
// 5. Input Validation: Enable/Disable Send Button (Requirement #11)
// -----------------------------------------------------------------------------
userInput.addEventListener("input", () => {
  const trimmedText = userInput.value.trim();
  // Disable button if input is empty, enable if it contains characters
  sendBtn.disabled = trimmedText.length === 0;
});


// -----------------------------------------------------------------------------
// 6. Handle Form Submission (Enter Key or Click Send Button)
// -----------------------------------------------------------------------------
chatForm.addEventListener("submit", async (event) => {
  // Prevent page from reloading on form submit
  event.preventDefault();

  const userMessage = userInput.value.trim();

  // Guard against empty submissions
  if (!userMessage) return;

  // 1. Display user message on the right
  appendMessage("user", userMessage);

  // 2. Clear input and disable Send button
  userInput.value = "";
  sendBtn.disabled = true;

  // 3. Show loading indicator and disable input while waiting
  typingIndicator.style.display = "flex";
  userInput.disabled = true;
  scrollToBottom();

  try {
    // 4. Send HTTP POST request to Flask backend
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    });

    // 5. Parse response JSON
    const data = await response.json();

    if (!response.ok) {
      // Backend returned an error status (e.g. 400 Bad Request)
      const errorMsg = data.error || "Something went wrong on the server.";
      appendMessage("bot", `⚠️ Error: ${errorMsg}`, true);
    } else {
      // 6. Display bot response on the left
      appendMessage("bot", data.response);
    }
  } catch (error) {
    // 7. Handle network error (e.g., Flask server is not running)
    console.error("Network or Fetch Error:", error);
    appendMessage(
      "bot",
      "⚠️ Could not connect to the backend server. Please make sure the Flask app is running at http://127.0.0.1:5000.",
      true
    );
  } finally {
    // 8. Clean up: Hide loading indicator and re-enable input
    typingIndicator.style.display = "none";
    userInput.disabled = false;
    userInput.focus();
    scrollToBottom();
  }
});

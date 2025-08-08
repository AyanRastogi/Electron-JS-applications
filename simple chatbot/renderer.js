// renderer.js
window.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('send-btn');
  const userInput = document.getElementById('user-input');
  const chatWindow = document.getElementById('chat-window');

  // Function to add a message to the chat window
  const addMessage = (text, sender) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
  };

  // Function to get a hardcoded bot response
  const getBotResponse = (userText) => {
    const lowerCaseText = userText.toLowerCase().trim();
    
    switch (lowerCaseText) {
      case 'hello':
      case 'hi':
        return 'Hello there! How can I help you today?';
      case 'how are you?':
        return 'I am just a bunch of code, but I am doing great! Thanks for asking.';
      case 'what is your name?':
        return 'I am a simple chatbot created with Electron.js.';
      case 'bye':
      case 'goodbye':
        return 'Goodbye! Have a great day.';
      default:
        return "Sorry, I don't understand that. I can only respond to a few phrases like 'hello', 'how are you?', and 'bye'.";
    }
  };

  const handleUserInput = () => {
    const text = userInput.value;
    if (!text) return;

    // Display user's message
    addMessage(text, 'user');
    userInput.value = '';

    // Get and display bot's response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      addMessage(botResponse, 'bot');
    }, 500);
  };
  
  sendBtn.addEventListener('click', handleUserInput);
  
  userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleUserInput();
    }
  });

  // Initial bot message
  setTimeout(() => {
    addMessage("Welcome! Type 'hello' to start.", 'bot');
  }, 500);
});

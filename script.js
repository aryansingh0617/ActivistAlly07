async function sendMessageToMentalBot(message) {
    try {
        const response = await fetch('http://localhost:3001/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.reply; // assuming the response has a 'reply' field
    } catch (error) {
        console.error('Error:', error);
        return 'There was an error connecting to the server.'; // return an error message
    }
}

// MentalBot functionality
const mentalBotButton = document.getElementById('mentalbot-btn');
const chatModal = document.getElementById('chat-modal');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const sendMessageBtn = document.getElementById('send-message-btn');

mentalBotButton.addEventListener('click', () => {
    chatModal.style.display = 'flex'; // Show the chat modal
    chatInput.focus(); // Focus on the input field
});

sendMessageBtn.addEventListener('click', async () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        appendMessage('You: ' + userMessage);
        chatInput.value = ''; // Clear input

        // Call the chatbot API
        const botResponse = await sendMessageToMentalBot(userMessage);
        appendMessage('MentalBot: ' + botResponse);
    }
});

chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessageBtn.click(); // Trigger send button click
    }
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom
}
 
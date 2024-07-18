document.addEventListener('DOMContentLoaded', () => {
    function addMessage(text, type) {
        const chatContainer = document.getElementById('messages');

        const message = document.createElement('div');
        message.textContent = text;
        message.classList.add(type === 'User' ? 'user-message' : 'bot-message');
        chatContainer.appendChild(message);

        // Ensure chat scrolls to the bottom for new messages
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Initial welcome message from Financial Bot
    addMessage("Hello! I'm here to help you with financial advice. What would you like to discuss today?", 'Bot');

    // Handle the send button click event
    document.getElementById('send-text-button').addEventListener('click', async () => {
        const userInput = document.getElementById('text-input').value;
        if (userInput.trim()) {
            addMessage(userInput, 'User');

            try {
                // Fetch response from the Financial Bot API endpoint
                const response = await fetch('/api/bot1', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userInput }),
                });

                if (response.ok) {
                    const data = await response.json();
                    addMessage(data.response, 'Bot');
                } else {
                    addMessage('Sorry, there was a problem with the request.', 'Bot');
                }
            } catch (error) {
                console.error('Error:', error);
                addMessage('Sorry, something went wrong. Please try again.', 'Bot');
            }
        }
    });

    // Handle the Enter key press event
    document.getElementById('text-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('send-text-button').click();
        }
    });
});

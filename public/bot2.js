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

    // Initial message from Luna
    addMessage("Hello! I'm Luna. How can I support you today?", 'Bot');

    // Handle the send button click event
    document.getElementById('send-text-button').addEventListener('click', async () => {
        const userInput = document.getElementById('text-input').value;
        if (userInput.trim()) {
            addMessage(userInput, 'User');

            try {
                // Fetch response from the Luna API endpoint
                const response = await fetch('/api/bot2', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userInput }),
                });

                if (response.ok) {
                    const data = await response.json();
                    addMessage(data.response, 'Luna');
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

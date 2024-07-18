document.addEventListener('DOMContentLoaded', () => {
    // Function to add a message to the chat
    function addMessage(text, type) {
        const chatContainer = document.getElementById('messages');

        const message = document.createElement('div');
        message.textContent = text;
        message.classList.add(type === 'User' ? 'user-message' : 'bot-message');
        chatContainer.appendChild(message);

        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Initial welcome message from Cooky
    addMessage("Hello! I'm Cooky. How can I help you with recipes or cooking tips today?", 'Bot');

    // Add event listener for the send button
    document.getElementById('send-text-button').addEventListener('click', async () => {
        const userInput = document.getElementById('text-input').value;
        if (userInput.trim()) {
            addMessage(userInput, 'User');

            try {
                const response = await fetch('/api/bot3', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userInput }),
                });
                const data = await response.json();
                addMessage(data.response, 'Cooky');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    // Add event listener for the Enter key
    document.getElementById('text-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('send-text-button').click();
        }
    });
});
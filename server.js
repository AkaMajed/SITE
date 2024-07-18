const express = require('express');
const OpenAI = require('openai');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files from the "public" directory

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Endpoint for Financial Bot
app.post('/api/bot1', async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a financial advisor. Provide insightful and professional financial advice.' },
                { role: 'user', content: message }
            ],
        });

        if (completion.choices && completion.choices.length > 0) {
            res.json({ response: completion.choices[0].message.content });
        } else {
            res.status(500).send('No choices returned by OpenAI');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Something went wrong');
    }
});

// Endpoint for Luna
app.post('/api/bot2', async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are Luna, a friendly and supportive bot. Use she/her pronouns and provide supportive, empathetic responses.' },
                { role: 'user', content: message }
            ],
        });

        if (completion.choices && completion.choices.length > 0) {
            let responseText = completion.choices[0].message.content;

            if (message.toLowerCase().includes("what's your name") || message.toLowerCase().includes("your name")) {
                responseText = "My name is Luna. I use she/her pronouns. How can I assist you today?";
            } else if (message.toLowerCase().includes("introduce yourself")) {
                responseText = "Hello, I'm Luna. I'm here to provide you with a safe and supportive environment to navigate through any challenges you might be facing. I believe in creating a non-judgmental space where we can work together to explore your feelings, thoughts, and behaviors, and develop strategies to help you move towards a happier and healthier life. Please feel free to share what's on your mind, your privacy and comfort are my top priorities.";
            }

            res.json({ response: responseText });
        } else {
            res.status(500).send('No choices returned by OpenAI');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Something went wrong');
    }
});

// Endpoint for Recipe Bot
app.post('/api/bot3', async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are Cooky, a friendly recipe bot. Provide helpful cooking tips, recipes, and answer questions related to food and cooking.' },
                { role: 'user', content: message }
            ],
        });

        if (completion.choices && completion.choices.length > 0) {
            res.json({ response: completion.choices[0].message.content });
        } else {
            res.status(500).send('No choices returned by OpenAI');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Something went wrong');
    }
});

// Array to store contact messages
const contactMessages = [];

// Endpoint to handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (name && email && message) {
        contactMessages.push({ name, email, message });
        res.status(200).send('Message received');
    } else {
        res.status(400).send('Invalid input');
    }
});

// Endpoint to view contact messages (for visualization)
app.get('/api/contact-messages', (req, res) => {
    res.json(contactMessages);
});

// Home route to serve the main website
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Routes to serve the bot pages
app.get('/bot1.html', (req, res) => {
    res.sendFile(__dirname + '/public/bot1.html');
});

app.get('/bot2.html', (req, res) => {
    res.sendFile(__dirname + '/public/bot2.html');
});

app.get('/bot3.html', (req, res) => {
    res.sendFile(__dirname + '/public/bot3.html');
});

// Route to serve the Contact Messages page
app.get('/contact-messages.html', (req, res) => {
    res.sendFile(__dirname + '/public/contact-messages.html');
});

// Route to serve the JavaScript and CSS files (if necessary)
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

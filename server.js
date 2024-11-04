const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001; // Make sure this port is not being used

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        }, {
            headers: {
                'Authorization': `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`, // Use your actual API key
                'Content-Type': 'application/json',
            },
        });

        const botResponse = response.data.choices[0].message.content;
        res.json({ message: botResponse });
    } catch (error) {
        console.error('Error details:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

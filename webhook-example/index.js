const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const cors = require('cors');

// Enable all CORS requests
app.use(cors());


// Use body-parser to parse incoming JSON requests
app.use(bodyParser.json());
app.get('/', (req, res) => {
     res.send('Hello');
 });// Webhook endpoint
app.post('/webhook', (req, res) => {
    const data = req.body;

    // Check if we have received any data
    if (data) {
        // Log received data (you can replace this with your own logic)
        console.log('Received webhook data:', data);

        // You can process the data as needed, like saving to a database or triggering other processes
        // Example: Save data to a file or database

        // Respond to the request to confirm receipt
        res.status(200).send('Webhook received successfully');
    } else {
        // If no data is received, respond with an error
        res.status(400).send('No data received');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Webhook server listening at http://localhost:${port}`);
});

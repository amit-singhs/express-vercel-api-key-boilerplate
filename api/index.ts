require('dotenv').config();

const express = require('express');
const app = express();

// API Key middleware
const apiKeyMiddleware = (req, res, next) => {
	// Skip API key check for /hello route
	if (req.path === '/hello') {
		return next();
	}

	const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
	const expectedApiKey = process.env.API_KEY;

	if (!apiKey || apiKey !== expectedApiKey) {
		return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
	}

	next();
};

// Apply API key middleware to all routes
app.use(apiKeyMiddleware);

app.get('/test', function (req, res) {
	res.send('Welcome to the test path, if you can see this that means you have the right API key !!!!');
});

app.get('/hello', function (req, res) {
	res.send('Hello Universe From the Restaurant API...!!');
});

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;

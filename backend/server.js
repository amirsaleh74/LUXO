const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Import routes

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Use the routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

// Middleware
app.use(cors());              // Allow cross-origin requests
app.use(express.json());      // Parse JSON request bodies

// Routes
app.use('/expenses', expenseRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running...');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

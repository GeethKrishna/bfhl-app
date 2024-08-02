const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());

const userId = "Geeth_Krishna_Potnuru_08062004"; // Hardcoded user_id

// GET endpoint
app.get('/', (req, res) => {
  res.json({ request_type: 'GET' });
});

// POST endpoint
app.post('/', (req, res) => {
  res.json({ request_type: 'POST' });
});

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  // Input validation
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id: userId,
      message: "Invalid input format. 'data' should be an array."
    });
  }

  const numbers = [];
  const alphabets = [];

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
    }
  });

  const highestAlphabet = alphabets.length > 0 
    ? [alphabets.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))[0]] 
    : [];

  res.json({
    is_success: true,
    user_id: userId,
    email: "geethkrishna_p@srmap.edu.in",
    roll_number: "AP21110011504",
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highestAlphabet
  });
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ is_success: false, message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log("Server listening at http://localhost:${port}");
});

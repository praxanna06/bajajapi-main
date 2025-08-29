require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

function buildUserId(fullName = 'john_doe', dob = '17091999') {
  const name = String(fullName)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
  const digits = String(dob).replace(/\D/g, '');
  const ddmmyyyy = digits.length === 8 ? digits : dob;
  return `${name}_${ddmmyyyy}`;
}

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: 'Invalid data format: "data" must be an array' });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    const letterSequence = [];

    for (const item of data) {
      const token = String(item).trim();
      if (/^[+-]?\d+$/.test(token)) {
        const n = parseInt(token, 10);
        if (Math.abs(n) % 2 === 0) {
          even_numbers.push(token);
        } else {
          odd_numbers.push(token);
        }
        sum += n;
      } else if (/^[a-zA-Z]+$/.test(token)) {
        alphabets.push(token.toUpperCase());
        for (const ch of token) letterSequence.push(ch);
      } else {
        if (token.length > 0) special_characters.push(token);
      }
    }

    const reversedLetters = letterSequence.reverse();
    const concatArr = reversedLetters.map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()));
    const concat_string = concatArr.join('');

    const response = {
      is_success: true,
      user_id: buildUserId(process.env.FULL_NAME || 'john_doe', process.env.DOB || '17091999'),
      email: process.env.EMAIL_ID || 'john@xyz.com',
      roll_number: process.env.REG_NO || 'ABCD123',
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error('Error in /bfhl:', err);
    return res.status(500).json({ is_success: false, message: 'Internal server error' });
  }
});

app.get('/bfhl', (req, res) => res.status(200).json({ operation_code: 1 }));

app.listen(port, () => console.log(`Server running on port ${port}`));

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

function generateUserId(nameInput = 'john_doe', birthDate = '17091999') {
  const formattedName = String(nameInput)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
  const numericDob = String(birthDate).replace(/\D/g, '');
  const dobFormatted = numericDob.length === 8 ? numericDob : birthDate;
  return `${formattedName}_${dobFormatted}`;
}

app.post('/bfhl', (req, res) => {
  try {
    const { data: inputArray } = req.body;
    if (!Array.isArray(inputArray)) {
      return res.status(400).json({ is_success: false, message: 'Invalid data format: "data" must be an array' });
    }

    const evens = [];
    const odds = [];
    const letters = [];
    const symbols = [];
    let totalSum = 0;
    const letterOrder = [];

    for (const element of inputArray) {
      const token = String(element).trim();
      if (/^[+-]?\d+$/.test(token)) {
        const num = parseInt(token, 10);
        if (Math.abs(num) % 2 === 0) {
          evens.push(token);
        } else {
          odds.push(token);
        }
        totalSum += num;
      } else if (/^[a-zA-Z]+$/.test(token)) {
        letters.push(token.toUpperCase());
        for (const ch of token) letterOrder.push(ch);
      } else {
        if (token.length > 0) symbols.push(token);
      }
    }

    const reversedLetters = letterOrder.reverse();
    const alternatingCaseLetters = reversedLetters.map((ch, idx) =>
      idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    );
    const combinedString = alternatingCaseLetters.join('');

    const responsePayload = {
      is_success: true,
      user_id: generateUserId(process.env.FULL_NAME || 'john_doe', process.env.DOB || '17091999'),
      email: process.env.EMAIL_ID || 'john@xyz.com',
      roll_number: process.env.REG_NO || 'ABCD123',
      odd_numbers: odds,
      even_numbers: evens,
      alphabets: letters,
      special_characters: symbols,
      sum: String(totalSum),
      concat_string: combinedString
    };

    return res.status(200).json(responsePayload);
  } catch (err) {
    console.error('Error in /bfhl:', err);
    return res.status(500).json({ is_success: false, message: 'Internal server error' });
  }
});

app.get('/bfhl', (req, res) => {
  return res.status(200).json({
    is_success: true,
    user_id: generateUserId(process.env.FULL_NAME || 'john_doe', process.env.DOB || '17091999')
  });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

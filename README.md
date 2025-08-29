BFHL API

Small Express API that implements the required /bfhl POST endpoint.
Accepts a JSON body with a single key data (an array of tokens) and returns analyses: even/odd numbers, alphabets (uppercase), special characters, sum (string), and concat_string per the assignment spec.

Live endpoint (use this for submission)

POST https://bajajapi-vflx.onrender.com/bfhl

Example:

curl -X POST https://bajajapi-vflx.onrender.com/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["a","1","334","4","R","$"]}'

Quick start (local)

Clone the repo:

git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>


Install dependencies:

npm install


Create a .env file (or set environment variables). Example .env:

FULL_NAME=Your Name Here
DOB=ddmmyyyy
EMAIL_ID=you@example.com
REG_NO=ABCD123
PORT=3500


Start the server:

npm start


Local testing:

curl -X POST http://localhost:3500/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["a","1","334","4","R","$"]}'

Request / Response
Request

Method: POST

URL: https://<your-host>/bfhl (local: http://localhost:3500/bfhl)

Header: Content-Type: application/json

Body:

{
  "data": ["a", "1", "334", "4", "R", "$"]
}

Successful Response (HTTP 200)
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}

Error example (bad input)

If data is not an array:

{
  "is_success": false,
  "message": "Invalid data format: \"data\" must be an array"
}

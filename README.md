
# BFHL API

A simple Express.js API that processes an array of mixed data (numbers, alphabets, special characters) and returns structured results including odd/even separation, alphabets in uppercase, special characters, sum of numbers, and a formatted concatenated string.

## 🚀 Features

* Separate **odd and even numbers**
* Extract and uppercase **alphabets**
* Identify **special characters**
* Compute **sum of numbers**
* Generate **concatenated alternating-case string** from letters
* User identification via environment variables

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd <your-repo-folder>
npm install
```

Create a `.env` file in the root directory with the following variables:

```env
PORT=3500
FULL_NAME=John Doe
DOB=17091999
EMAIL_ID=john@xyz.com
REG_NO=ABCD123
```

---

## ▶️ Running the Server

Start the server:

```bash
npm start
```

By default, it runs on `http://localhost:3500`.

---

## 📡 API Endpoints

### **GET /bfhl**

Health check endpoint.

**Response:**

```json
{
  "operation_code": 1
}
```

---

### **POST /bfhl**

Processes an input array.

**Request Body:**

```json
{
  "data": ["A", "1", "2", "b", "@", "9"]
}
```

**Response:**

```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1", "9"],
  "even_numbers": ["2"],
  "alphabets": ["A", "B"],
  "special_characters": ["@"],
  "sum": "12",
  "concat_string": "bA"
}
```

---

## ⚙️ Utility Function

The project includes a `generateUserId(name, dob)` function to create a unique user ID:

* Converts name to lowercase with underscores
* Strips unwanted characters
* Appends formatted DOB

Example:

```js
generateUserId("John Doe", "17-09-1999");
// Output: "john_doe_17091999"
```

---

## 🛠 Tech Stack

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [CORS](https://www.npmjs.com/package/cors)

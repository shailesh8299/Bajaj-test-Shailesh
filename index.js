const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


const FULL_NAME = "john_doe";         
const DOB = "17091999";               
const EMAIL = "john@xyz.com";         
const ROLL_NUMBER = "ABCD123";       

function isIntegerString(value) {
  return typeof value === "string" && /^-?\d+$/.test(value.trim());
}
function alternatingCapsReverse(allLetters) {
  let res = "";
  let upper = true;
  for (let i = allLetters.length - 1; i >= 0; i--) {
    const ch = allLetters[i];
    res += upper ? ch.toUpperCase() : ch.toLowerCase();
    upper = !upper;
  }
  return res;
}
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "BFHL API running. Use POST /bfhl",
    route: "/bfhl",
    method: "POST"
  });
});
app.post("/bfhl", (req, res) => {
  try {
    const body = req.body || {};
    const data = Array.isArray(body.data) ? body.data : null;
    if (!data) {
      return res.status(200).json({
        is_success: false,
        user_id: `${FULL_NAME}_${DOB}`,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: "",
        error: "Invalid payload: 'data' must be an array of strings."
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;
    let allAlphabetChars = "";

    for (const item of data) {
      const str = String(item);

      if (isIntegerString(str)) {
        const num = parseInt(str, 10);
        if (num % 2 === 0) {
          even_numbers.push(num.toString()); 
          odd_numbers.push(num.toString());
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(str)) {
     
        alphabets.push(str.toUpperCase());
        allAlphabetChars += str; 
      } else {
    
        special_characters.push(str);
        const lettersOnly = str.replace(/[^a-zA-Z]/g, "");
        allAlphabetChars += lettersOnly;
      }
    }

    const response = {
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`, 
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(), 
      concat_string: alternatingCapsReverse(allAlphabetChars)
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(200).json({
      is_success: false,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: err.message || "Unexpected error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
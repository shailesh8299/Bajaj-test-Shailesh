# BFHL API – bajaj-project

REST API (POST `/bfhl`) that:
- Splits input array into even, odd, alphabets (uppercase), special characters
- Returns sum (as string) of numeric items
- Builds concatenation of **all alphabetic characters** present in the input, **reversed** with **alternating caps** (starting Upper)
- Responds with:
  - `is_success`
  - `user_id` in format `full_name_ddmmyyyy` (full name in lowercase)
  - `email`
  - `roll_number`

## Tech
- Node.js + Express

## Run locally

```bash
npm install
npm start
# or for hot-reload during development
npm run dev

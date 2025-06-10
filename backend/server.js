const express= require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world')
})

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.query('SELECT 1');
    console.log('Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
})();
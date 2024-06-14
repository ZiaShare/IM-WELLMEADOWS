
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const port = 5500;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
  user: 'postgres',
  password: 'gwapo123',
  host: 'localhost',
  database: 'postgres',
  port: 5432,
});

app.post('/register', async (req, res) => {
  const { firstName, lastName, address, telephone, birthday, sex, maritalStatus, dateRegistered } = req.body;
  let client;

  try {

    if (!req.body) {
      throw new Error('Missing request body');
    }

    if (!firstName || !lastName || !address || !telephone || !birthday || !sex || !maritalStatus || !dateRegistered) {
      throw new Error('Missing required fields in request body');
    }

    const client = await pool.connect();

    const formattedBirthday = new Date(birthday).toISOString().slice(0, 10);

    const query = 'INSERT INTO patients (first_name, last_name, address, telephone, date_of_birth, sex, marital_status, date_registered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [firstName, lastName, address, telephone, formattedBirthday, sex, maritalStatus, dateRegistered];

    await client.query(query, values);

    res.json({ message: 'Patient registration successful!' });
  } catch (error) {
      console.error('Error registering patient:', error);
      res.status(500).json({ message: 'Internal server error' }); 
    } finally {
      if (client) {
        try {
          await client.release();
        } catch (error) {
          console.error('Error releasing connection:', error);
        }
      }
    }
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
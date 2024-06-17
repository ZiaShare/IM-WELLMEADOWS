<<<<<<< HEAD
const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs').promises;

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

const adminFile = path.join(__dirname, 'admins.json');

function convertToPostgresTimestamp(isoDateTime) {
  const isoDateTimeObj = new Date(isoDateTime);
  return isoDateTimeObj.toISOString().replace('T', ' ').slice(0, -5);
}

async function initializeAdminsFile() {
  try {
    await fs.writeFile(adminFile, '[]');
    console.log('Initialized admins.json with an empty array.');
  } catch (error) {
    console.error('Error initializing admins.json file:', error);
  }
}

async function writeToAdminsFile(adminData) {
  try {
    let data;
    try {
      data = await fs.readFile(adminFile, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        data = '[]';
      } else {
        throw error;
      }
    }

    let admins = JSON.parse(data);
    const existingAdminIndex = admins.findIndex((a) => a.admin === adminData.admin);

    if (adminData.password) {
      if (existingAdminIndex !== -1) {
        admins[existingAdminIndex].password = adminData.password;
        console.log(`Updated password for admin ${adminData.admin}`);
      } else {
        admins.push({
          admin: adminData.admin,
          password: adminData.password,
          status: adminData.status || '',
          patients: [],
          appointments: [],
          localDoctors: []
        });
        console.log(`Added new admin ${adminData.admin}`);
      }
    } else if (adminData.status) {
      if (adminData.status !== 'InPatient' && adminData.status !== 'OutPatient') {
        throw new Error('Invalid status. Status must be "InPatient" or "OutPatient".');
      }
      if (existingAdminIndex !== -1) {
        admins[existingAdminIndex].status = adminData.status;
        console.log(`Updated status for admin ${adminData.admin}`);
      } else {
        throw new Error('Admin not found');
      }
    }

    await fs.writeFile(adminFile, JSON.stringify(admins, null, 2));
    console.log('Updated admins.json file successfully.');
  } catch (error) {
    console.error('Error writing to admins.json file:', error);
    throw new Error('Error writing to admins.json file');
  }
}


app.post('/admin/check', async (req, res) => {
  const { admin } = req.body;

  if (!admin) {
    return res.status(400).json({ message: 'Admin is required' });
  }

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM admins WHERE admin = $1';
    const result = await client.query(query, [admin]);
    client.release();

    if (result.rows.length > 0) {
      console.log(`Admin ${admin} exists.`);
      res.json({ message: 'Admin exists', admin: result.rows[0] });
    } else {
      console.log(`Admin ${admin} not found.`);
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error checking admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/admin/register', async (req, res) => {
  const { admin, password } = req.body;

  if (!admin || !password) {
    return res.status(400).json({ message: 'Admin and password are required' });
  }

  try {
    await writeToAdminsFile({ admin, password, status: '' });

    console.log(`Registered new admin: ${admin}`);
    res.json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ message: 'Error registering admin' });
  }
});

app.get('/admins', async (req, res) => {
  try {
    const data = await fs.readFile(adminFile, 'utf8');
    const admins = JSON.parse(data);
    console.log('Fetched admins from admins.json:', admins);
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ message: 'Error fetching admins' });
  }
});

app.post('/admin/updateStatus', async (req, res) => {
  const { admin, status } = req.body;

  if (!admin || !status) {
    return res.status(400).json({ message: 'Admin and status are required' });
  }

  if (status !== 'InPatient' && status !== 'OutPatient') {
    return res.status(400).json({ message: 'Invalid status. Status must be "InPatient" or "OutPatient".' });
  }

  try {
    await writeToAdminsFile({ admin, status });

    console.log(`Updated status successfully for admin ${admin}: ${status}`);
    res.json({ message: `Status updated successfully for admin ${admin}` });
  } catch (error) {
    console.error('Error updating admin status:', error);
    res.status(500).json({ message: 'Error updating admin status' });
  }
});

app.post('/admin/login', async (req, res) => {
  const { admin, password } = req.body;

  if (!admin || !password) {
    return res.status(400).json({ message: 'Admin and password are required' });
  }

  try {
    await writeToAdminsFile({ admin, password });

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  const {
    firstName, lastName, address, telephone, birthdate, sex, maritalStatus, dateRegistered,
    consultantName, id, examRoom, dateTime, referralName, clinicNumber, referralAddress, referralTelephone, admin
  } = req.body;

  try {
    if (!firstName || !lastName || !address || !telephone || !birthdate || !sex || !maritalStatus ||
      !dateRegistered || !consultantName || !id || !examRoom || !dateTime || !referralName ||
      !clinicNumber || !referralAddress || !referralTelephone || !admin) {
      throw new Error('Missing required fields');
  }

    const client = await pool.connect();
    const formattedBirthdate = moment(birthdate, ["DD/MM/YYYY", "D/M/YYYY", "DD/MM/YY", "MMMM D, YYYY"]).format("YYYY-MM-DD");
    const formattedDateRegistered = moment(dateRegistered, ["DD/MM/YYYY", "D/M/YYYY", "DD/MM/YY", "MMMM D, YYYY"]).format("YYYY-MM-DD");
    const formattedDateTime = convertToPostgresTimestamp(dateTime);

    if (formattedDateTime === 'Invalid date') {
      throw new Error('Invalid date format received from client');
    }

    const patientNumber = await findNextPatientNumber(client);
    const appointmentNumber = await findNextAppointmentNumber(client);

    const patientQuery = 'INSERT INTO patients (patient_number, first_name, last_name, address, telephone, date_of_birth, sex, marital_status, date_registered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const patientValues = [patientNumber, firstName, lastName, address, telephone, formattedBirthdate, sex, maritalStatus, formattedDateRegistered];
    await client.query(patientQuery, patientValues);

    const appointmentQuery = 'INSERT INTO appointments (appointment_number, patient_number, consultant_name, id, exam_room, date_time) VALUES ($1, $2, $3, $4, $5, $6)';
    const appointmentValues = [appointmentNumber, patientNumber, consultantName, id, examRoom, formattedDateTime];
    await client.query(appointmentQuery, appointmentValues);

    const doctorQuery = 'INSERT INTO local_doctors (name, clinic_number, address, telephone) VALUES ($1, $2, $3, $4)';
    const doctorValues = [referralName, clinicNumber, referralAddress, referralTelephone];
    await client.query(doctorQuery, doctorValues);


    await updateAdminData(admin, {
      patient_number: patientNumber,
      first_name: firstName,
      last_name: lastName,
      address: address,
      telephone: telephone,
      date_of_birth: formattedBirthdate,
      sex: sex,
      marital_status: maritalStatus,
      date_registered: formattedDateRegistered
    }, {
      appointment_number: appointmentNumber,
      consultant_name: consultantName,
      id: id,
      exam_room: examRoom,
      date_time: formattedDateTime
    }, {
      name: referralName,
      clinic_number: clinicNumber,
      address: referralAddress,
      telephone: referralTelephone
    });


    client.release();

    res.json({ message: 'Patient registration, appointment scheduling, and local doctor information successfully recorded!' });
  } catch (error) {
    console.error('Error registering patient and appointment:', error);
    res.status(500).json({ message: 'Error processing registration' });
  }
});

app.get('/appointments', async (req, res) => {
  try {
    const client = await pool.connect();
    const query = 'SELECT a.date_time, p.first_name, p.last_name FROM appointments a JOIN patients p ON a.patient_number = p.patient_number';
    const result = await client.query(query);
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});


async function findNextPatientNumber(client) {
  try {
    const query = 'SELECT MAX(patient_number) AS max_number FROM patients';
    const result = await client.query(query);
    let maxNumber = result.rows[0].max_number || 'P10000';

    if (!/^P\d+$/.test(maxNumber)) {
      throw new Error('Invalid patient number format in database');
    }

    const currentNumber = parseInt(maxNumber.substr(1), 10);

    if (currentNumber >= 999999) {
      throw new Error('Maximum patient number exceeded');
    }

    const nextNumber = `P${currentNumber + 1}`;

    return nextNumber;
  } catch (error) {
    throw new Error('Error fetching next patient number');
  }
}


async function findNextAppointmentNumber(client) {
  try {
    const query = 'SELECT MAX(appointment_number) AS max_number FROM appointments';
    const result = await client.query(query);
    let maxNumber = result.rows[0].max_number || 'A10000';

    if (!/^A\d+$/.test(maxNumber)) {
      throw new Error('Invalid appointment number format in database');
    }

    const currentNumber = parseInt(maxNumber.substr(1), 10);

    if (currentNumber >= 999999) {
      throw new Error('Maximum appointment number exceeded');
    }

    const nextNumber = `A${currentNumber + 1}`;

    return nextNumber;
  } catch (error) {
    throw new Error('Error fetching next appointment number');
  }
}

/**
 * Update admin data in admins.json file.
 * @param {string} admin - The admin username.
 * @param {Object} patientData - Data related to the patient.
 * @param {Object} appointmentData - Data related to the appointment.
 * @param {Object} doctorData - Data related to the local doctor.
 * @returns {Promise<void>}
 */
async function updateAdminData(admin, patientData, appointmentData, doctorData) {
  try {
    let data = await fs.readFile(adminFile, 'utf8');
    let admins = JSON.parse(data);

    const adminIndex = admins.findIndex(a => a.admin === admin);
    if (adminIndex === -1) {
      throw new Error('Admin not found');
    }

    admins[adminIndex].patients.push(patientData);
    admins[adminIndex].appointments.push(appointmentData);
    admins[adminIndex].localDoctors.push(doctorData);

    await fs.writeFile(adminFile, JSON.stringify(admins, null, 2));
    console.log('Updated admin data successfully.');
  } catch (error) {
    console.error('Error updating admin data:', error);
    throw new Error('Error updating admin data');
  }
}


initializeAdminsFile().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
=======
<<<<<<< HEAD

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
=======

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
>>>>>>> origin/main
  });
>>>>>>> 6f3832743fb74fb9cb98e68ab882473d4cf4d84e

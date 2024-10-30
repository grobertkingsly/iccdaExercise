const express = require('express');
const sql = require('mssql');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 80;

// Configure view engine
app.set('view engine', 'ejs');

// Azure SQL Database connection configuration
const config = {
  user: 'iccdasqladmin@iccdalabdbserver',
  password: 'Muscat@1234567',
  server: 'iccdalabdbserver.database.windows.net',
  database: 'ICCDALabDatabase',
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

// Route to fetch data and render the view
app.get('/', async (req, res) => {
  try {
    // Connect to the Azure SQL database
    const pool = await sql.connect(config);

    // Query the database
    const result = await pool.request().query('SELECT TOP 10 * FROM Users');

    // Render the data in 'index.ejs' template
    res.render('index', { data: result.recordset });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Error connecting to the database');
  } finally {
    sql.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

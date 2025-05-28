const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'recetas_abuela'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

// Ruta para recibir datos del formulario
app.post('/api/contacto', (req, res) => {
  const { nombre, apellidos, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const sql = 'INSERT INTO contacto (nombre, apellidos, email, mensaje) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, apellidos, email, mensaje], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    res.json({ success: 'Mensaje enviado correctamente' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const connection = require('./db');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de registro de usuario
app.post('/register', async (req, res) => {
  const { nombre_completo, fecha_nacimiento, usuario, email, contrasena } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const sql = `INSERT INTO usuarios 
                 (nombre_completo, fecha_nacimiento, usuario, email, contrasena)
                 VALUES (?, ?, ?, ?, ?)`;

    connection.query(sql, [nombre_completo, fecha_nacimiento, usuario, email, hashedPassword], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al registrar usuario.');
      }
      res.status(200).send('Usuario registrado exitosamente.');
    });
  } catch (error) {
    console.error('Error al encriptar contraseña:', error);
    res.status(500).send('Error interno');
  }
});

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
  const { usuario, contrasena } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
  connection.query(sql, [usuario], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const usuarioEncontrado = results[0];

    const esValida = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);

    if (esValida) {
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

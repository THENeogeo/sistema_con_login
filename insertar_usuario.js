// insertar_usuario.js
const db = require('./db');

const nuevoUsuario = {
  nombre_completo: 'Geovani Peña Ramirez',
  usuario: 'el buengeo',
  email: 'geovani@gmail.com',
  fecha_nacimiento: '1999-07-19',
  contrasena: 'geovani'
};

const sql = `
  INSERT INTO usuarios (nombre_completo, usuario, email, fecha_nacimiento, contrasena)
  VALUES (?, ?, ?, ?, ?)
`;

db.query(sql, [
  nuevoUsuario.nombre_completo,
  nuevoUsuario.usuario,
  nuevoUsuario.email,
  nuevoUsuario.fecha_nacimiento,
  nuevoUsuario.contrasena
], (err, result) => {
  if (err) {
    console.error('❌ Error al insertar usuario:', err);
  } else {
    console.log('✅ Usuario insertado con éxito. ID:', result.insertId);
  }
});

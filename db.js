// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',         // o también puedes dejar 'localhost'
  user: 'root',
  password: 'admin',              // déjalo vacío si no configuraste una contraseña
  database: 'sistema_web'    // asegúrate que esta base exista en MySQL
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err);
  } else {
    console.log('✅ Conexión exitosa a MySQL');
  }
});

module.exports = connection;

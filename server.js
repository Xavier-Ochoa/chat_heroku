const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Crear una app de Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar carpeta pública (el cliente HTML y JS)
app.use(express.static('public'));

// Manejar la conexión del socket
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Escuchar el mensaje enviado desde el cliente
  socket.on('enviar-mensaje', (mensaje) => {
    console.log('Mensaje recibido: ', mensaje);
    io.emit('nuevo-mensaje', mensaje);  // Emitir el mensaje a todos los clientes
  });

  // Cuando un usuario se desconecta
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});


# Chat en Tiempo Real 💬

Aplicación de chat global en tiempo real construida con **Express.js** y **Socket.io**. 

> Complemento del Backend ESFOT - Plataforma de Proyectos

Link del chat para probarlo: https://chat1heroku.onrender.com/ 

## ¿Qué es?

Un chat simple pero funcional que permite a múltiples usuarios comunicarse instantáneamente. Los mensajes se entregan en tiempo real usando WebSockets.

## Features

- 💬 **Chat Global** - Todos los usuarios ven los mensajes
- ⚡ **Tiempo Real** - Mensajes instantáneos con Socket.io
- 👥 **Contador de Usuarios** - Ver quién está conectado
- 📱 **Responsivo** - Funciona en mobile y desktop
- 🎨 **Interfaz Limpia** - Diseño moderno y simple

## Instalación Rápida

```bash
# Clonar
git clone https://github.com/tu-usuario/chat-en-tiempo-real.git
cd chat-en-tiempo-real

# Instalar dependencias
npm install

# Ejecutar
node server.js
```

Abre `http://localhost:3000` en tu navegador.

## Tecnologías

- **Node.js** - Runtime
- **Express.js** - Framework web
- **Socket.io** - WebSockets
- **HTML/CSS/JS** - Frontend

## Cómo Funciona

1. **Cliente** escribe un mensaje
2. **Servidor** recibe el evento `enviar-mensaje`
3. **Servidor** emite `nuevo-mensaje` a **todos** los clientes
4. **Todos los clientes** reciben el mensaje instantáneamente

```javascript
// Cliente
socket.emit('enviar-mensaje', 'Hola a todos!');

// Servidor
socket.on('enviar-mensaje', (mensaje) => {
  io.emit('nuevo-mensaje', mensaje);  // Broadcast a todos
});

// Todos reciben
socket.on('nuevo-mensaje', (mensaje) => {
  mostrarEnPantalla(mensaje);
});
```

## Demo en Vivo

[Chat en Vivo](https://chat1heroku.onrender.com/) 🚀

## Estructura

```
chat-en-tiempo-real/
├── server.js          # Servidor Express + Socket.io
├── public/
│   └── index.html     # Página del chat
├── package.json
└── Procfile           # Para Render/Heroku
```

## Variables de Entorno

```bash
PORT=3000           # Puerto del servidor (default: 3000)
NODE_ENV=production # Ambiente (development/production)
```

## Eventos Socket.io

### Cliente → Servidor
```javascript
socket.emit('enviar-mensaje', 'Tu mensaje aquí');
```

### Servidor → Cliente
```javascript
socket.on('nuevo-mensaje', (msg) => {
  // msg es el mensaje recibido
});

socket.on('actualizar-usuarios', (count) => {
  // count es el número de usuarios conectados
});
```

## Mejoras Futuras

- [ ] Autenticación de usuarios
- [ ] Salas de chat temáticas
- [ ] Historial de mensajes (MongoDB)
- [ ] Indicador "escribiendo..."
- [ ] Emojis y reacciones

## Despliegue

### En Render

1. Push a GitHub
2. Conectar en [Render.com](https://render.com)
3. Seleccionar rama `main`
4. Deploy automático
5. ¡Listo! Tu chat estará en vivo

**Procfile ya incluido** con: `web: node server.js`

### En Heroku (Legacy)

```bash
heroku login
heroku create mi-chat
git push heroku main
```

## Problemas Comunes

**Error: "Cannot GET /"**
- Verifica que `public/index.html` existe
- Verifica que `app.use(express.static('public'));` está en server.js

**No se conectan los mensajes**
- Verifica que Socket.io está en el cliente: `<script src="/socket.io/socket.io.js"></script>`
- Abre la consola del navegador (F12) para ver errores
- Verifica que el servidor está corriendo en el puerto correcto

**WebSocket connection failed**
- En producción, verifica CORS:
```javascript
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
```

## Testing Manual

1. Abre el chat en 2 navegadores (o 2 tabs)
2. Escribe un mensaje en uno
3. Deberías verlo instantáneamente en el otro
4. El contador de usuarios debe ser 2

## Dependencias

```json
{
  "express": "^5.2.1",
  "socket.io": "^4.8.3"
}
```

## Cómo Contribuir

1. Fork el repo
2. Crea una rama: `git checkout -b feature/nombre`
3. Haz commit: `git commit -m "Agregar feature"`
4. Push: `git push origin feature/nombre`
5. Abre un Pull Request

## Licencia

ISC

## Autor

Proyecto ESFOT - Escuela Politécnica Nacional

---

**Nota:** Este es un chat simple. Para producción con usuarios, autenticación y persistencia, consulta [MEJORAS.md](./MEJORAS.md) para ver ejemplos avanzados.

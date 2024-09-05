const editor = document.getElementById('editor');
const socket = new WebSocket('ws://localhost:8080'); // Replace with your server URL

// Send changes to the server
editor.addEventListener('input', () => {
    socket.send(editor.value);
});

// Receive updates from the server
socket.addEventListener('message', (event) => {
    editor.value = event.data;
});

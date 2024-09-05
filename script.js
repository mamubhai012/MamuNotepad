const editor = document.getElementById('editor');
const socket = new WebSocket('ws://localhost:8080'); // Replace with your server URL

// Send changes to the server
editor.addEventListener('input', () => {
    socket.send(editor.value);
});

// Receive updates from the server
socket.addEventListener('message', (event) => {
    editor.value = event.data;
    let debounceTimeout;
editor.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        socket.send(editor.value);
    }, 300); // Adjust debounce delay as needed
});

});

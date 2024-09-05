const editor = document.getElementById('editor');
const status = document.getElementById('status');
const socket = new WebSocket('https://mamunotepad.onrender.com/'); // Replace with your WebSocket server URL

let debounceTimeout;
editor.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        socket.send(editor.value);
    }, 300);
});

socket.addEventListener('message', (event) => {
    const receivedText = event.data;
    editor.value = receivedText;
    status.textContent = 'Document updated by another user!';
});

socket.addEventListener('open', () => {
    status.textContent = 'Connected to server.';
});

socket.addEventListener('close', () => {
    status.textContent = 'Disconnected from server.';
});

socket.addEventListener('error', () => {
    status.textContent = 'Error connecting to server.';
});

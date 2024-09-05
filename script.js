const editor = document.getElementById('editor');
const saveBtn = document.getElementById('saveBtn');
const socket = new WebSocket('ws://localhost:8080'); // Replace with your server URL

let debounceTimeout;
editor.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        socket.send(editor.value);
    }, 300);
});

socket.addEventListener('message', (event) => {
    editor.value = event.data;
});

saveBtn.addEventListener('click', () => {
    const text = editor.value;
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    }).then(response => {
        if (response.ok) {
            alert('Document saved!');
        } else {
            alert('Failed to save document.');
        }
    });
});

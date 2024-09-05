const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080; // Use environment port for deployment
const wss = new WebSocket.Server({ noServer: true });

let documentContent = '';

wss.on('connection', ws => {
    ws.on('message', message => {
        documentContent = message;
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

app.use(bodyParser.json());
app.post('/save', (req, res) => {
    documentContent = req.body.text;
    fs.writeFileSync(path.join(__dirname, 'document.txt'), documentContent);
    res.sendStatus(200);
});

const server = app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, ws => {
        wss.emit('connection', ws, request);
    });
});

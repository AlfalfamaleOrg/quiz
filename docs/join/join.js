import debug from '../debug.js';
let myId;
if (debug) {
    myId = 'client';
}

const peer = new peerjs.Peer(myId);
let server;
let QRCodeElement = document.getElementById("qrcode");
const messageFromServer = (data) => {
    console.log('server:', data);
    const {message, type} = JSON.parse(data);
    switch(type) {
        case 'ping':
            server.send(JSON.stringify({type: 'pong', message: 'client'}));
            QRCodeElement.innerHTML = '';
            break;
        default:
            console.log('Unknown message type:', type);
    }
}

peer.on('open', (id) => {
    new QRCode(document.getElementById("qrcode"), id);
    console.log(`onScanSuccess('${id}')`);
    let serverId = location.hash.slice(1);
    peer.connect(serverId);
    peer.on('connection', serverConnection => {
        server = serverConnection;
        server.on('data', messageFromServer);
    });
});

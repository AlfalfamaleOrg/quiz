import debug from '../debug.js';
let myId;
if (debug) {
    myId = 'host';
}

const peer = new peerjs.Peer(myId);
let server;
let QRCodeElement = document.getElementById("qrcode");
const messageFromServer = (data) => {
    console.log('server:', data);
    const {message, type} = JSON.parse(data);
    switch(type) {
        case 'ping':
            server.send(JSON.stringify({type: 'pong', message: 'host'}));
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
        QRCodeElement.innerHTML = '';
        server = serverConnection;
        const html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            {fps: 10, qrbox: {width: 250, height: 250}},
            false
        );

        window.onScanSuccess = (message) => {
            server.send(JSON.stringify({type: 'client', message}));
        }

        html5QrcodeScanner.render(onScanSuccess);

        server.on('data', messageFromServer);
    });

});

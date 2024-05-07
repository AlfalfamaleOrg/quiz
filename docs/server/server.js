import debug from '../debug.js';
let myId;
if (debug) {
    myId = 'server';
}
let host;

const clients = [];

const messageFromClient = function(data){
    console.log(this)
    console.log('client:', data);
    const {message, type} = JSON.parse(data);
    switch(type) {
        case 'pong': break;
        default:
            console.log('Unknown message type:', type);
    }
};

const connectClient = (message) => {
    const client = peer.connect(message)
    client.on('open', () => {
        console.log('Client connected:', message);
        client.send(JSON.stringify({type: 'ping', message: 'server'}));
    });
    client.on('data', messageFromClient);
}

const messageFromHost = (data) => {
    console.log('host:', data);
    const {message, type} = JSON.parse(data);
    switch(type) {
        case 'client':
            console.log('Client joined:', message);
            connectClient(message);
            break;
        case 'pong': break;
        default:
            console.log('Unknown message type:', type);
    }
};
const peer = new peerjs.Peer(myId);
let QRCodeElement = document.getElementById("qrcode");
peer.on('open', (id) => {
    let target = window.location.origin + '/host#' + id;
    new QRCode(QRCodeElement, target);
    console.log(target);
    window.onScanSuccess = (hostId) => {
        host = peer.connect(hostId);
        host.on('open', () => {
            host.send(JSON.stringify({type: 'ping', message: 'server'}));
            let target = window.location.origin + '/join#' + id;
            console.log(target);
            QRCodeElement.innerHTML = '';
            new QRCode(QRCodeElement, target);
            html5QrcodeScanner.clear();
        });
        host.on('data', messageFromHost);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        {fps: 10, qrbox: {width: 250, height: 250}},
        /* verbose= */ false);
    html5QrcodeScanner.render(onScanSuccess);

});


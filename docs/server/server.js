let localConnection = null; // RTCPeerConnection for our "local" connection

let sendChannel = null; // RTCDataChannel for the local (sender)


const hostConnection = new RTCPeerConnection();

sendChannel = hostConnection.createDataChannel("sendChannel");
console.log(sendChannel);
sendChannel.onopen = () => {
    console.log('onOpen', arguments);
};
sendChannel.onclose = () => {
    console.log('onClose', arguments);
};



const offer = await hostConnection.createOffer();
console.log(offer);
await hostConnection.setLocalDescription(offer);
const description = hostConnection.localDescription;
console.log(description.toJSON());





new QRCode(document.getElementById("qrcode"), window.location.origin + '/join#' + description.sdp.toString());
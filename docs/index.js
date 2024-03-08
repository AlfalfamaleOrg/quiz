const peerConnection = new RTCPeerConnection();
const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);
const output = fetch('https://signal.vdhout.click/signal', {body: JSON.stringify(offer), method: 'POST'});
console.log(output);
const peerConnection = new RTCPeerConnection();
const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);
const output = await fetch('https://signal.vdhout.click/signal', {body: JSON.stringify(offer), method: 'POST', credentials: 'include'});
console.log(output);
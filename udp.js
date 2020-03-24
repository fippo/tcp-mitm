// udp variant of the MITM. Easier since it always gets full udp packets
// without framing.
// To use, set TYPE to 'udp' in javascript and replace HOST with the address below.
const dgram = require('dgram');
const net = require('net');

function isRTCP(packet) {
    const pt = packet.readUInt8(1) & 0x7f;
    return pt >= 72 && pt <= 79;
}

// https://tools.ietf.org/html/rfc5764#section-5.1.2
function demultiplex(packet) {
    const first = packet[0];
    let response;
    if (first < 2) { // stun
    } else if (first > 127 && first < 192 && this.srtpSession) { // RTP or RTCP
        if (isRTCP(packet)) {
            // RTCP
        } else {
            // RTP
        }
    } else if (first > 19 && first < 64 && this.dtlsTransport) { // dtls
    } else {
    }
}

const address = '127.0.0.1';
const c1 = dgram.createSocket('udp4');
c1.bind({port: 4404, address});
c1.on('message', (packet, rinfo) => {
    c1.peer = rinfo;
    demultiplex(packet);
    if (c2.peer) {
        c2.send(packet, c2.peer.port, c2.peer.address);
    }
});

const c2 = dgram.createSocket('udp4');
c2.bind({port: 4405, address});
c2.on('message', (packet, rinfo) => {
    c2.peer = rinfo;
    demultiplex(packet);
    if (c1.peer) {
        c1.send(packet, c1.peer.port, c1.peer.address);
    }
});

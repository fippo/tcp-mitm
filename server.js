const net = require('net');

let c1;
let c2;
net.createServer((socket) => {
    c1 = socket;
    socket.on('close', () => c1 = null);
    socket.on('error', () => c1 = null);
    socket.on('data', (data) => {
        if (c2) {
            const first = data[3]; // extra two bytes for tcp framing
            if (first < 2) { // stun
                const messageType = data.readUInt16BE(2);
                console.log('STUN', '0x' + messageType.toString(16));
                // Could do something here. Like... send more stun packets.
            }
            c2.write(data);
        }
    });
}).listen(4404);
net.createServer((socket) => {
    c2 = socket;
    socket.on('close', () => c2 = null);
    socket.on('error', () => c1 = null);
    socket.on('data', (data) => {
        if (c1) {
            c1.write(data);
        }
    });
}).listen(4405);

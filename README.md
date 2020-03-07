# what this does
It drops all valid candidates in onicecandidate. If you control only one side you would need to do the same in addIceCandidate on the "attacker".
Then it injects its own candidate which is a TCP one. This injection
happens in onicecandidate for the other peer connection so instead of the
"null" candidate (which might not exist in native; there is an icegatheringstatechange to completed instead)
a tcp candidate is signalled to the other end. On one side is signals localhost port 4404 and on the other localhost port 4405.
Again for simplicity and you might have to move the logic a bit such that
1) you signal a candidate with tcp port 4404 in onicecandidate and drop all other candidates (function signalFromPc1)
2) you add a candidate with tcp port 4405 in addIceCandidate and drop all other candidates (function signalFromPc2)

server.js is a very simple node server that listens on port 4404 and 4405
and relays between those ports. On one of these ports it has some additional debug output for every stun packet received.
It can then send another stun packet (e.g. a copy of the packet it just received; note that parsing the length from the first
can be a bit tricky since we're running stun over tcp which means an additional two bytes at the beginning of each packet that specify the length of the stun packet.
Or... you just make the attacker generate more STUN packets themselves.

# How to start
`node server.js`
google-chrome index.html (oddly only works from file:// url...)

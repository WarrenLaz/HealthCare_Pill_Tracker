
function sha256(message) {
    // Constants used in SHA-256
    const K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0x7851b8b5, 0x8b44f7af, 0x9f84f4c6, 0x5b9cca4f, 0x1d97f48b, 0x7f4a7c13, 0x7f4a7c14,
        0x2e1b5ab7, 0x64f6c6e6, 0x32e9f91c, 0x4e68135b, 0x8256e1dd, 0x7b707d99, 0x68f1e38f, 0x470fd7b5
    ];

    // Pre-processing the message (Padding)
    let msg = new TextEncoder().encode(message); // Convert message to byte array
    let msgLength = msg.length * 8; // Length in bits
    msg = Array.from(msg);
    msg.push(0x80); // Append the '1' bit (0x80 byte)
    
    // Padding message to make its length a multiple of 512 bits
    while ((msg.length * 8) % 512 !== 448) {
        msg.push(0x00);
    }

    // Add the original message length (in bits) as a 64-bit big-endian integer
    for (let i = 7; i >= 0; i--) {
        msg.push((msgLength >>> (i * 8)) & 0xFF);
    }

    // Break the padded message into 512-bit blocks
    let blocks = [];
    for (let i = 0; i < msg.length; i += 64) {
        blocks.push(msg.slice(i, i + 64));
    }

    // Initial hash values
    let H = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];

    // Processing each block
    for (let block of blocks) {
        // Prepare the message schedule
        let W = new Array(64);
        for (let i = 0; i < 16; i++) {
            W[i] = (block[i * 4] << 24) | (block[i * 4 + 1] << 16) | (block[i * 4 + 2] << 8) | block[i * 4 + 3];
        }

        // Extend the message schedule (W[16..63])
        for (let i = 16; i < 64; i++) {
            let s0 = rightRotate(W[i - 15], 7) ^ rightRotate(W[i - 15], 18) ^ (W[i - 15] >>> 3);
            let s1 = rightRotate(W[i - 2], 17) ^ rightRotate(W[i - 2], 19) ^ (W[i - 2] >>> 10);
            W[i] = (W[i - 16] + s0 + W[i - 7] + s1) & 0xffffffff;
        }

        // Initialize working variables
        let [a, b, c, d, e, f, g, h] = H;

        // Main loop: 64 rounds
        for (let i = 0; i < 64; i++) {
            let S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
            let ch = (e & f) ^ ((~e) & g);
            let temp1 = (h + S1 + ch + K[i] + W[i]) & 0xffffffff;
            let S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
            let maj = (a & b) ^ (a & c) ^ (b & c);
            let temp2 = (S0 + maj) & 0xffffffff;

            // Update working variables
            h = g;
            g = f;
            f = e;
            e = (d + temp1) & 0xffffffff;
            d = c;
            c = b;
            b = a;
            a = (temp1 + temp2) & 0xffffffff;
        }

        // Update the hash values
        H[0] = (H[0] + a) & 0xffffffff;
        H[1] = (H[1] + b) & 0xffffffff;
        H[2] = (H[2] + c) & 0xffffffff;
        H[3] = (H[3] + d) & 0xffffffff;
        H[4] = (H[4] + e) & 0xffffffff;
        H[5] = (H[5] + f) & 0xffffffff;
        H[6] = (H[6] + g) & 0xffffffff;
        H[7] = (H[7] + h) & 0xffffffff;
    }

    // Convert hash to hexadecimal string
    return H.map(x => x.toString(16).padStart(8, '0')).join('');
}

// Helper function: Right Rotate
function rightRotate(value, amount){return (value >>> amount) | (value << (32 - amount));}

module.exports = sha256;
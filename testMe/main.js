const agent = require('../packages/agent/build/index.js');
const candid = require('../packages/candid/build/index.js');
const { Ed25519KeyIdentity } = require('../packages/identity/build/index.js');
const { Secp256k1KeyIdentity } = require('../packages/identity-secp256k1/build/index.js');
const { Principal } = require('../packages/principal/build/index.js');




const id = Ed25519KeyIdentity.generate();
console.log(id.getPrincipal().toText());


const id2 = Secp256k1KeyIdentity.generate();
console.log(id2.getPrincipal().toText());
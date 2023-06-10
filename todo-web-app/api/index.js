const openvpnmanager = require('node-openvpn');

const opts = {
   host: 'go.ua.pt', // normally '127.0.0.1', will default to if undefined
   port: 1337, //port openvpn management console
};

const auth = {
   user: 'gilteixeira@ua.pt',
   pass: 'Beer-killer23',
};
const openvpn = openvpnmanager.connect(opts)
openvpn.on('connected', () => {
    console.log('Connected to OpenVPN');
   openvpnmanager.authorize(auth);
});
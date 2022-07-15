const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = "SSchool dapp";

function CheckToken(token) {
    let auth;
    jwt.verify(token, SECRET, (err, decoded) => {
        if (decoded) {
            auth = true;
        } else {
            auth = false;
        }
    });
    return auth;
}

function CreateToken(email) {

    const token = jwt.sign({ email: email }, SECRET, { expiresIn: 300000000 });

    return token;
}

module.exports = { CheckToken, CreateToken };
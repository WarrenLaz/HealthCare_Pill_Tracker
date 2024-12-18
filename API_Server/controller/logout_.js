const db = require('./dbcontroller');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;
    console.log(cookies.jwt);
    // Is refreshToken in db?
    const foundUser = db.getData(db.getData('Physicians', 'Physician'), {
        jwtauth : refreshToken
    })[0];
    //usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    const response = db.updateData(db.getData('Physician', 'Physicians'), {jwtauth : refreshToken}, {
        $set : { refreshToken : ""}
    })
    console.log(response);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = handleLogout
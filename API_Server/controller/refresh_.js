const db = require('./dbcontroller');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    console.log("Refresh: ", refreshToken);
    db.getData(db.getDB("Physicians", "Physician"), {jwtauth : refreshToken}).then( data => data[0]).then(foundUser => {
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify( 
        refreshToken,
        process.env.RTS,
        (err, decoded) => {
            console.log(foundUser['_id'].toString());
            console.log(decoded.user.toString());
            console.log(err);
            if (err || foundUser['_id'].toString() !== decoded.user.toString()) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"user" : foundUser['_id']}, 
                process.env.ATS, 
                {expiresIn: '30s'}
            );
            res.send({status: "200 OK", packet: accessToken});
        }
    );
});
}

module.exports = handleRefreshToken
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWTver = (req, res, next) =>{
    const authHead = req.headers['authorization'];
    if(!authHead) return res.send('401');
    console.log(authHead);
    const token = authHead.split(' ')[1];
    console.log(token);
    jwt.verify(
        token,
        process.env.RTS, 
        (err,decoded) => {
            if(err) return res.send('403');
            req.user = decoded.user;
            next();
        } 
    )
}

module.exports = JWTver;
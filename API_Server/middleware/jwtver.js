const jwt = require('jsonwebtoken');
//require('dotenv').config();

const JWTver = (req, res, next) =>{
    const authHead = req.headers['authorization'];

    if(!authHead) return res.send('401');
    const token = authHead.split(' ')[1];
    jwt.verify(
        token,
        process.env.ATS, 
        (err, decoded) => {
            if(err) return res.sendStatus(403);
            req.user = decoded
            next();
        } 
    )

}
module.exports = JWTver;
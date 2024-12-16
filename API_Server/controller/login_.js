const db = require('./dbcontroller');
const sha256 = require('../encryptor/sha256');
const jwt = require('jsonwebtoken');
const { ObjectId } = require("mongodb");

//Login
const Login  = (req,res) =>{
    payload = req.body['LoginForm'];
    db.getData(db.getDB('Physicians', 'Physician'), {Email_Address : payload['Username']}).then(
        data => data[0]
    ).then(
        data => {
            if (typeof data === 'undefined') {
                //invalid email
                res.send({status : "Invalid Email", packet: ""});
            } else{
                const pass = sha256(payload['Password']);
                if(data['Password'] === pass){
                    //VALID
                    accessToken = jwt.sign(
                        {"user" : data['_id']}, 
                        process.env.ATS, 
                        {expiresIn: '30s'}
                    );

                    refreshToken = jwt.sign(
                        {"user" : data['_id']}, 
                        process.env.RTS, 
                        {expiresIn: '1d'}
                    );
                    
                    console.log(refreshToken);
                    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 864 * 100 * 100})
                    db.updateData(db.getDB('Physicians', 'Physician'), 
                        {_id : ObjectId(data['_id'])}, 
                        {$set : {jwtauth : refreshToken}}
                    ).then(res => console.log(res));

                    res.send({status: "200 OK", packet: accessToken});
                } else{
                    //invalid password
                    res.send({status: "Invalid Password",packet: ""} );
                }
            }
    })

    // payload = res.get()
    console.log("Login Successful");
}

module.exports = Login;
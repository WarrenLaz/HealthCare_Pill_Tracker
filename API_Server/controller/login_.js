const db = require('./dbcontroller');
const sha256 = require('../encryptor/sha256');
const jwt = require('jsonwebtoken');
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
                //const pass = sha256(payload['Password']);
                const pass = payload['Password'];
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
                    
                    res.send({status: "200 OK", packet: {
                        id : data["_id"],
                        fn : data['First_Name'],
                        ln: data['Last_Name'],
                        p: data['Patients']
                    }});

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
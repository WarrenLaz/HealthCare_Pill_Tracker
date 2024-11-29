const db = require('./dbcontroller');
const sha256 = require('../encryptor/sha256')
//Login
const handleLogin  = (req,res) =>{
    payload = req.body['LoginForm'];
    console.log(payload);
    db.getData(db.getDB('Physicians', 'Physician'), {Email_Address : payload['Username']}).then(
        data => data[0]
    ).then(
        data => {
            if (typeof data === 'undefined') {
                res.send({status : "Invalid Email", packet: ""});
            } else{
                const pass = sha256(payload['Password']);
                console.log(data['Password'], pass);
                if(data['Password'] === pass){
                    console.log(data)
                    res.send({status: "200 OK", packet: data['_id']});
                } else{
                    res.send({status: "Invalid Password",packet: ""} );
                }
            }
    })

    // payload = res.get()
    console.log("Successful")
}

module.exports = handleLogin;
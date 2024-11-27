const express = require('express');
const mongo = require('mongodb');
const app = express();
const uri = process.env.MOGO_KEY;
const port = process.env.PORT;
const cors = require('cors')
const MongoClient = new mongo.MongoClient(uri);
const allowedOrigins = require('./config/allowedOrigins');
// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or Postman) or validate against the allowedOrigins list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow request
      } else {
        callback(new Error('Not allowed by CORS')); // Deny request
      }
    },
    credentials: true, // Allow credentials (cookies, auth headers)
};
app.use(cors(corsOptions));

function getDB(db, collection){
    return MongoClient.db(db).collection(collection);
}

async function getData(collection, query) {
    try{
        await MongoClient.connect();
        console.log('connected to Mongo [GET]: ', collection);
        const table = collection;
        return await table.find(query).toArray();
    }
    catch(err){
        console.log('Error Unsucessful: ', err)
        return err;
    }
}

async function pushData(collection, query) {
    try{
        await MongoClient.connect();
        console.log('connected to Mongo [INSERT]: ', collection);
        const table = collection;

        await table.insertOne(query);

        return '200 OK';
    }
    catch(err){
        console.log('Error Unsucessful: ', err)
        return err;
    }
}

//"Xanax", "adderall","Lupron Depot", "Ozempic", "Ibuprofen", "Zyprexa", "Wezlana"
app.post('/drugs',(req,res)=> {
    //payload would go into ping([PAYLOAD])
    const drugName = req.body['search'];
    console.log(req.body);
    getData(getDB('DrugProducts', 'Drugs'), {"DrugName" : {$regex : drugName.toUpperCase()} }).then(drugDB => {
        console.log(drugDB);
        res.send(drugDB);
    });
});

app.post('/supple',(req,res)=> {
    //payload would go into ping([PAYLOAD])
    const Supplement = req.body['search'];
    getData(getDB('DrugProducts', 'Supplements'), {"Product Name" : {$regex : Supplement.charAt(0).toUpperCase() + Supplement.slice(1)} }).then(drugDB => {
        console.log(drugDB);
        res.send(drugDB);
    });
});

app.post('/Registration',(req,res)=> {
    //payload would go into ping([PAYLOAD])
    const payload = req.body['data'];

    getData(getDB('Physicians', 'Physician'), {
        "$or": [
            {Phone_Number : payload['Practice_Phone_Number']},
            {Email_Address : payload['Practice_Email_Address']}
        ]
    }).then(
        data => data[0]
    ).then(
        data => {
            if (!(typeof data === 'undefined')) {
                res.send("Account Already Exists");
            }
            else{
                pushData(getDB('Physicians', 'Physician'), 
                {
                    First_Name: payload['First_Name'],
                    Last_Name: payload['Last_Name'],
                    Password: payload['Password'],
                    Email_Address: payload['Practice_Email_Address'],
                    Phone_Number: payload['Practice_Phone_Number']
                })
                res.send("Account Successfully Created")
            }
    })
});

app.get('/Logs', (req,res) =>{
    getData(getDB("Prescriptions", "Log"), {}).then(
       data => res.send(data)
    )
})

//Login
app.post('/Login', (req,res) =>{
    payload = req.body['LoginForm'];
    console.log(payload);
    getData(getDB('Physicians', 'Physician'), {Email_Address : payload['Username']}).then(
        data => data[0]
    ).then(
        data => {
            if (typeof data === 'undefined') {
                res.send({status: "Invalid Email", packet: ""});
            } else{
                if(data['Password'] === payload['Password']){
                    console.log(data)
                    res.send({status: "200 OK", packet: data['_id']});
                } else{
                    res.send({status: "Invalid Password",packet: ""} );
                }
            }
    })

    // payload = res.get()
    console.log("Successful")
});

//example post
app.post('/example', (req,res) =>{
    //this will get some payload
    // payload = res.get()
    console.log("Successful")
});

//example get
app.get('/exampe', (req,res) =>{
    //this will get some payload
    // payload = res.get()
    console.log("Successful")
});

app.listen(port, () => console.log('Server is running', port))



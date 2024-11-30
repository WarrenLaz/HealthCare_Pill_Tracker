const express = require('express');
const mongo = require('mongodb');
const app = express();
const uri = process.env.MOGO_KEY;
const port = process.env.PORT;
const cors = require('cors');
const corsOptions = require('./middleware/creds');

const MongoClient = new mongo.MongoClient(uri);
// For parsing application/json
app.use(cors(corsOptions));
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));


app.post('/supple',(req,res)=> {
    //payload would go into ping([PAYLOAD])
    const Supplement = req.body['search'];
    getData(getDB('DrugProducts', 'Supplements'), {"Product Name" : {$regex : Supplement.charAt(0).toUpperCase() + Supplement.slice(1)} }).then(drugDB => {
        console.log(drugDB);
        res.send(drugDB);
    });
});

//Login
app.use('/Login', require('./routes/login'));
//Registration
app.use('/Reg', require('./routes/reg'));
//Add Patient
app.use('/AddPatient', require('./routes/addpatient'));

app.listen(port, () => console.log('Server is running', port))



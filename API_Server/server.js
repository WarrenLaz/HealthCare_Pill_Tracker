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

app.get('/Logs', (req,res) =>{
    getData(getDB("Prescriptions", "Log"), {}).then(
       data => res.send(data)
    )
})

//Login
app.use('/Login', require('./routes/login'));

//Registration
app.use('/Reg', require('./routes/reg'));

app.listen(port, () => console.log('Server is running', port))



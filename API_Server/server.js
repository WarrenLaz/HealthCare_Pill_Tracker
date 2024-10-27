const express = require('express');
const mongo = require('mongodb');
const app = express();
const uri = process.env.MOGO_KEY;
const port = process.env.PORT;

const MongoClient = new mongo.MongoClient(uri);

// For parsing application/json
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

app.get('/time', (req,res) => {
    const date = new Date();
    pushData(getDB('Patients', 'medication_log'), {"timestamp" : date}).then(resp =>{
        res.send(resp);
    })
});

app.post('/drugs',(req,res)=> {
    //payload would go into ping([PAYLOAD])
    const drugName = req.body['search'];

    getData(getDB('DrugProducts', 'Drugs'), {"DrugName" : {$regex : drugName.toUpperCase()} }).then(drugDB => {
        console.log(drugDB);
        res.send(drugDB);
    });
});

app.post('/supple',(req,res)=> {
    //payload would go into ping([PAYLOAD])
    const Supplement = req.body['search']
    getData(getDB('DrugProducts', 'Supplements'), {"Product Name" : {$regex : Supplement.charAt(0).toUpperCase() + Supplement.slice(1)} }).then(drugDB => {
        console.log(drugDB);
        res.send(drugDB);
    });
});


app.get('/patient',(req,res)=> {
    //payload would go into ping([PAYLOAD])
    pushData(getDB('Patients', 'patient'), 
    {
        FirstName: "test",
        LastName: "test",
        Birhtday: "test",
        Address: "test",
        Phone_number: "test",
        Email: "test",
        Password: "test",
    }).then(status => {
        console.log(status);
        res.send(status);
    });
});

app.get('/physicians',(req,res)=> {
    //payload would go into ping([PAYLOAD])
    pushData(getDB('Physicians', 'Physician'), 
    {
        FirstName: "test",
        LastName: "test",
        Birhtday: "test",
        Address: "test",
        Phone_number: "test",
        Email: "test",
        Password: "test"
    }).then(status => {
        console.log(status);
        res.send(status);
    });
});

//"Xanax", "adderall","Lupron Depot", "Ozempic", "Ibuprofen", "Zyprexa", "Wezlana"
app.post('/', (req,res) =>{
    //this will get some payload
    // payload = res.get()
    console.log("Successful")
});

app.listen(port, () => console.log('Server is running', port))



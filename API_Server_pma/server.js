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

app.post('/Logs',(req,res) => {
    Log = req.body['date']['log'];
    console.log(Log);
    pushData(getDB("Prescriptions", "Log"), 
    {
       timestamp : new Date(Log),
       medication : "002"
    }
    )
    res.send("GOOD OK");
});

app.listen(port, () => console.log('Server is running', port))
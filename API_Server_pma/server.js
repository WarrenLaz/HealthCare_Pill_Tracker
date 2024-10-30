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

app.post('/Log',(req,res) => {
    Log = req.body;
    console.log(Log['date']);
    res.send("GOOD OK");
});

app.listen(port, () => console.log('Server is running', port))
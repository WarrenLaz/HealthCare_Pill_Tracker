const express = require('express');
const mongo = require('mongodb');
const app = express();
const uri = process.env.MOGO_KEY;
const port = process.env.PORT;

console.log(port);
console.log(uri);

app.listen(port, () => console.log('Server is running', port))

const MongoClient = new mongo.MongoClient(uri);

function getDB(db, collection){
    return MongoClient.db(db).collection(collection);
}

async function ping(RxName) {
    try{
        await MongoClient.connect();
        console.log('connected to Mongo');

        const drugs = getDB('DrugProducts', 'Drugs');
        return drugs.findOne({"DrugName" : String(RxName).toUpperCase() });
    }
    catch(err){
        console.log('Error Unsucessful: ', err)
        return err;
    }
}


console.log("Done");

app.get('/', (req,res) =>{
    ping("ozempic").then(drug => {
        const id = drug["_id"]
        const prodno = drug["ProductNo"]
        const Form = drug["Form"]
        const DrugName = drug["DrugName"]
        const Strength = drug["Strength"]
        const ActiveIng = drug["ActiveIngredient"]
        res.send(
            "<center> <h1>".concat(DrugName).concat("</h1>")
            .concat("\n<p> product number: ").concat(prodno).concat("</p>")
            .concat("\n<p> Form: ").concat(Form).concat("</p>")
            .concat("\n<p> Strength: ").concat(Strength).concat("</p>")
            .concat("\n<p> ActiveIng: ").concat(ActiveIng).concat("</p> <\center>")
        )
    });
    console.log("Successful")
});


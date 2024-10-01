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
        const druglist = [];
        for(var i = 0; i < RxName.length; i++){
            druglist.push(await drugs.findOne({"DrugName" : {$regex : String(RxName[i]).toUpperCase()} }));
            console.log(RxName[i]);
        }
        return druglist;
    }
    catch(err){
        console.log('Error Unsucessful: ', err)
        return err;
    }
}


app.get('/', (req,res) =>{
    ping(["Lyrica", "Ozempic", "Ibuprofen", "Zyprexa", "Wezlana"]).then(drugDB => {
        var html = "<style> table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style> <h1> DrugList Query Table </h1> <table> <tr> <th> ID </th> <th>ProductNo</th> <th>Form</th> <th>DrugName</th> <th> Strength </th> <th> Active Ingredient </th> </tr>" 
        for (var i = 0; i < drugDB.length; i++){
            const id = drugDB[i]["_id"];
            const prodno = drugDB[i]["ProductNo"];
            const Form = drugDB[i]["Form"];
            const DrugName = drugDB[i]["DrugName"];
            const Strength = drugDB[i]["Strength"];
            const ActiveIng = drugDB[i]["ActiveIngredient"];
            const table = `<tr> <td> ${id} </td> <td> ${prodno} </td> <td> ${Form} </td> <td> ${DrugName} </td> <td> ${Strength} </td> <td> ${ActiveIng} </td> </tr>`
            html = html.concat(table);
        }
        console.log(html)
        html = html.concat("</table>");
        res.send(html);
    });
    console.log("Successful")
});


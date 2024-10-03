const express = require('express');
const mongo = require('mongodb');
const app = express();
const uri = process.env.MOGO_KEY;
const port = process.env.PORT;

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
            const dlist = await drugs.find({"DrugName" : {$regex : String(RxName[i]).toUpperCase()} }).toArray();
            for(var j = 0; j < dlist.length;j++){
                druglist.push(dlist[j]);
            }
        }
        return druglist;
    }
    catch(err){
        console.log('Error Unsucessful: ', err)
        return err;
    }
}

//"Xanax", "adderall","Lupron Depot", "Ozempic", "Ibuprofen", "Zyprexa", "Wezlana"
app.get('/', (req,res) =>{
    ping([ "ozempic"]).then(drugDB => {
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
        html = html.concat("</table>");
        res.send(html);
    });
    console.log("Successful")
});



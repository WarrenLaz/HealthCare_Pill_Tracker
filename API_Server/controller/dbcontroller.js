const mongo = require('mongodb');
const uri = process.env.MOGO_KEY;

const MongoClient = new mongo.MongoClient(uri);

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

async function updateData(collection, id, query) {
    try{
        await MongoClient.connect();
        console.log('connected to Mongo [UPDATE]: ', collection);
        const table = collection;

        await table.updateOne(id, query);

        return '200 OK';
    }
    catch(err){
        console.log('Error Unsucessful: ', err)
        return err;
    }
}

async function deleteData(collection, id, query) {
    try{
        await MongoClient.connect();
        console.log('connected to Mongo [DELETE]: ', collection);
        const table = collection;

        await table.deleteOne(query);

        return '200 OK';
    }
    catch(err){
        console.log('Error Unsucessful: ', err)
        return err;
    }
}

module.exports = {getData, pushData, getDB, updateData, deleteData};
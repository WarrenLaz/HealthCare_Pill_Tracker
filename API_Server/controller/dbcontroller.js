//import the mongo db library
const mongo = require("mongodb");

//retrieve connection string from .env file
//create an instance of MongoClient to connect to DB
const uri = process.env.MOGO_KEY;
const MongoClient = new mongo.MongoClient(uri);

//retrieves collection from db
//so arguments would be "Patients" , "patient" for DB and Collection
function getDB(db, collection) {
  return MongoClient.db(db).collection(collection);
}

//retrieves data based on a specfic query
// we use getDB to get colletion and then getData to query
//returns the data as an array
async function getData(collection, query) {
  try {
    await MongoClient.connect();
    console.log("connected to Mongo [GET]: ", collection);
    const table = collection;
    return await table.find(query).toArray();
  } catch (err) {
    console.log("Error Unsucessful: ", err);
    return err;
  }
}

// inserts data into a collection based on query
async function pushData(collection, query) {
  try {
    await MongoClient.connect();
    console.log("connected to Mongo [INSERT]: ", collection);
    const table = collection;

    await table.insertOne(query);

    return "200 OK";
  } catch (err) {
    console.log("Error Unsucessful: ", err);
    return err;
  }
}

// updates data within a collection
// we use the id to select which item to update
async function updateData(collection, id, query) {
  try {
    await MongoClient.connect();
    console.log("connected to Mongo [UPDATE]: ", collection);
    const table = collection;

    await table.updateOne(id, query);

    return "200 OK";
  } catch (err) {
    console.log("Error Unsucessful: ", err);
    return err;
  }
}

//deletes and data in a collection
async function deleteData(collection, id, query) {
  try {
    await MongoClient.connect();
    console.log("connected to Mongo [DELETE]: ", collection);
    const table = collection;

    await table.deleteOne(query);

    return "200 OK";
  } catch (err) {
    console.log("Error Unsucessful: ", err);
    return err;
  }
}

module.exports = { getData, pushData, getDB, updateData, deleteData };

const db = require("./dbcontroller");

// const { ObjectId } = require("mongodb");
// 
const Thresh_a = 12;
const Thresh_b = 20;
var reorder = false;

const Batching = (key, DaysLeft, Batch) => {
    if(DaysLeft <= Thresh_a){
        Batch.push(key);
        return Batch, 1
    }

    if(DaysLeft <= Thresh_b){
        return Batch, 2
    }

    return Batch, 0
}

module.exports = Batching;

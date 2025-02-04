const db = require("../dbcontroller");

// getDB(db, collection) - returns collection
// db.getData(collection, query)
// searches for documents where "Product_Name" matches the payload using MongoDB's $regex operator
const getMedications = (req, res) => {
  const payload = req.body["val"];
  console.log(payload);
  db.getData(db.getDB("DrugProducts", "Products"), {
    Product_Name: { $regex: payload },
  }).then((data) => {
    res.send(data.slice(0, 10));
  });
};

module.exports = getMedications;

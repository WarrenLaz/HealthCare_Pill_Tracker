const db = require('../dbcontroller');

const getUser = (req, res) =>{
    db.getData(db.getDB('DrugProducts', "Products"), {
        id_ : req.body["user"]
    }).then( data => data[0]).then(
        data => {
            res.send({
                Product_Name : data['Product_Name'],
                Brand_Name : data['Brand_Name'], 
                Form : data['Form'],
            })
        }
    )
}

module.exports = getUser;
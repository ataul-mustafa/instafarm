const { default: mongoose } = require("mongoose");


const dbCon = () =>{
    mongoose.connect(process.env.DB_URL, {useNewUrlParser:true});
}
module.exports = dbCon;
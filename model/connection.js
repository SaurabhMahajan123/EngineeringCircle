
const mongoose = require('mongoose');

// to connect mongodb


async function connect() {
  await mongoose.connect('mongodb+srv://saurabhmahajan1997:Saurabh123@engineeringcircle.hadi3jf.mongodb.net/EngineeringCircle')
  console.log("db is connected");
}





// const con = mysql.createConnection({

//     host:'localhost',
//     user:'root',
//     password:'123456',
//     database:'registration'

// })

// con.connect((err)=>{

//     if(err){
//         console.warn(err)
//     }else{
//         console.warn('connection establish')
//     }


// })

module.exports = {
    connect
}
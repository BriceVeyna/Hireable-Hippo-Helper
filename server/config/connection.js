const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hippodb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// mongoose.connect('mongodb://127.0.0.1:27017/Hireable-Hippo-Helper',function(){
//     /* Drop the DB */
//     mongoose.connection.db.dropDatabase();
// });

//mongodb+srv://m001-student:m001-mongodb-basics@cluster0.dy1kgod.mongodb.net/Hireable-Hippo-Helper?retryWrites=true&w=majority

module.exports = mongoose.connection;
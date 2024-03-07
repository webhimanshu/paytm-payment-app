const mongoose = require('mongoose');
const DB_NAME = require('../constants.js');

const connectToDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('MONGODB Connection Error:', error);
        process.exit(1);// its comes with nodejs our current application is running on some process and its referance of that process 
    }
}

module.exports = connectToDb;
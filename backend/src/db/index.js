const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('MONGODB Connection Error:', error);
        process.exit(1);// its comes with nodejs our current application is running on some process and its referance of that process 
    }
}

module.exports = connectToDb;
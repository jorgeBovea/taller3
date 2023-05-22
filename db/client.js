//const MongoClient = require('mongodb').MongoClient;
const { connect, connection} = require('mongoose');
const mongoWatchers = require('./watchers');

connectToMongoDB = async () => {
  
    const connectionString = process.env.DB_URL;
    
    try {
        console.log('Conectandose a MongoDB...');
        await connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexion con MongoDB establecida.');
        connection.on('error', console.error.bind(console, 'Error de conexión: '));
        connection.once('open', () => console.log('Conectado a MongoDB'));
    } catch (e) {
        console.log('Error conectandose a MongoDB');
        console.log(e);
    } finally {
        mongoWatchers.setUpMongoDBProcessWatchers();
    }  

    return null;
    
};

const closeMongoDB = mongoWatchers.gracefulShutdown;

module.exports =  { connectToMongoDB, closeMongoDB };
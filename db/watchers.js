const { connection } = require('mongoose');

const gracefulShutdown = async () => {
  console.log('Cerrando conexión a MongoDB...');
  await connection.close();
  console.log('Conexión a MongoDB cerrada.');
};

const setUpMongoDBProcessWatchers = () => {
  // cerrar conexion en process.exit()
  process.on('exit', gracefulShutdown);

  // cerrar conexion en comandos del CLI.
  //process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
  //process.on('SIGKILL', gracefulShutdown);

  // cerrar conexion en excepciones no controladas.
  process.on('uncaughtException', (error) =>{ 
      console.log(error.message)
    gracefulShutdown});
};

module.exports = { gracefulShutdown, setUpMongoDBProcessWatchers }
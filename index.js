const app = require('./app');
const port = 3000;

const main = async () => {
  
  const db = require('./db/client');
  await db.connectToMongoDB();
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

}

main();
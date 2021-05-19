const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://PD:RitterSport@cluster1.zxck5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);
const myDb = 'ToDoList';

async function db() {
  await client.connect();

  const db = client.db(myDb);

  return db;
}

module.exports = {
  MongoClient,
  url,
  db,
};
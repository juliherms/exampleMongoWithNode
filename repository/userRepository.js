const { MongoClient } = require('mongodb');

function userRepository() {

    const url = 'mongodb+srv://wsuser:1234ws@cluster0-zacxn.mongodb.net/test?retryWrites=true';
    const dbName = 'course';

  
    function loadData(data) {
      return new Promise(async (resolve, reject) => {
          
        const client = new MongoClient(url);
        try {
          await client.connect();
          const db = client.db(dbName);
  
          results = await db.collection('users').insertMany(data);
          resolve(results);
  
        } catch (error) {
          reject(error)
        }
      })
    }
  
    return { loadData }
  
  }
  
  module.exports = userRepository();
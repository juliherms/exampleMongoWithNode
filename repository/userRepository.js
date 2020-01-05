const { MongoClient } = require('mongodb');

function userRepository() {

    const url = 'mongodb+srv://wsuser:1234ws@cluster0-zacxn.mongodb.net/test?retryWrites=true';
    const dbName = 'course';

    /**
     * Responsibel to get data
     */
    function get(){
        return new Promise( async (resolve, reject) =>{

            const client = new MongoClient(url);
            try {

             await client.connect();
             const db = client.db(dbName);
             const items = db.collection('users').find();

             resolve(await items.toArray());
             client.close();

           } catch (error) {
             
             reject(error);
           }
        });
    }
  
    /**
     * Responsible to input data from json
     */
    function loadData(data) {
      return new Promise(async (resolve, reject) => {

        const client = new MongoClient(url);
        try {
          await client.connect();
          const db = client.db(dbName);
  
          results = await db.collection('users').insertMany(data);
          resolve(results);
          client.close();   

        } catch (error) {
          reject(error)
        }
      })
    }
  

    return { loadData, get }
  
  }
  
  module.exports = userRepository();
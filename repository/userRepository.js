const { MongoClient , ObjectID } = require('mongodb');

function userRepository() {

    const url = 'mongodb+srv://wsuser:1234ws@cluster0-zacxn.mongodb.net/test?retryWrites=true';
    const dbName = 'course';

    /**
     * responsible to addItem
     * 
     */
    function add(item){
      return new Promise(async (resolve, reject) =>{
        const client = new MongoClient(url);

        try{
          await client.connect();
          const db = client.db(dbName);
          const addedItem = await db.collection('users').insertOne(item);
          resolve(addedItem.ops[0]);
          client.close();
        } catch(error){
          reject(error);
        }
      })
    }

    /**
     * Responsible to get by Id
     */
    function getById(id){
      return new Promise(async (resolve, reject) => {
        const client = new MongoClient(url);
        try{
          await client.connect();
          const db = client.db(dbName);
          const item = db.collection('users').findOne({_id: ObjectID(id) });
          resolve(item);
          client.close();
        } catch (error) {
          reject(error);
        }
      });
    }

    /**
     * Responsible to get data
     */
    function get(query,limit){
        return new Promise( async (resolve, reject) =>{

            const client = new MongoClient(url);
            try {

             await client.connect();
             const db = client.db(dbName);
             let items = db.collection('users').find(query);

             if(limit > 0){
               items = items.limit(limit);
             }

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
  
    //export functions
    return { loadData, get, getById, add }
  
  }
  
  module.exports = userRepository();
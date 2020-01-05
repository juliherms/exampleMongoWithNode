const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const userRepo = require('./repository/userRepository');
const data = require('./data/user.json');

const url = 'mongodb+srv://wsuser:1234ws@cluster0-zacxn.mongodb.net/test?retryWrites=true';
const dbName = 'course';



async function main(){
    const client = new MongoClient(url);
    await client.connect();

    const results = await userRepo.loadData(data);

    console.log(results);

    //check test insert.
    assert.equal(data.length,results.insertedCount);
    
    
    const getData = await userRepo.get();
    console.log(getData);
   


    
    const admin = client.db(dbName).admin();
    //console.log(await admin.serverStatus());
    
    client.close();
}

main();
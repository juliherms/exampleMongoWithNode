const MongoClient = require('mongodb').MongoClient;
const userRepo = require('./repository/userRepository');
const data = require('./data/user.json');

const url = 'mongodb+srv://wsuser:1234ws@cluster0-zacxn.mongodb.net/test?retryWrites=true';
const dbName = 'course';



async function main(){
    const client = new MongoClient(url);
    await client.connect();

    const results = await userRepo.loadData(data);
    console.log(results.insertedCount,results.ops);

    const admin = client.db(dbName).admin();
    //console.log(await admin.serverStatus());
    console.log(await admin.listDatabases());
}

main();
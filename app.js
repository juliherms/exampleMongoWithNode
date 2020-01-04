const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://wsuser:1234ws@cluster0-zacxn.mongodb.net/test?retryWrites=true';
const dbName = 'course';

async function main(){
    const client = new MongoClient(url);
    await client.connect();

    const admin = client.db(dbName).admin();
    console.log(await admin.serverStatus());
    console.log(await admin.listDatabases());
}

main();
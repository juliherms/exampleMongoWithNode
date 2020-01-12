const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const userRepo = require('./repository/userRepository');
const data = require('./data/user.json');

const url = 'mongodb+srv://wsuser:1234ws@cluster0-zacxn.mongodb.net/test?retryWrites=true';
const dbName = 'course';



async function main(){

    const client = new MongoClient(url);
   
    try{

        await client.connect();

        const results = await userRepo.loadData(data);

       // console.log(results);

        //check test insert.
        //assert.equal(data.length,results.insertedCount);
    
        const getData = await userRepo.get();
        //console.log(getData);

        const filterData = await userRepo.get({User : getData[0].User});
        console.log(filterData);

        const limitData = await userRepo.get({}, 3);
        console.log(limitData);

        //get by id
        const byId = await userRepo.getById(getData[0]._id);
        console.log(byId);

        //add
        const newUser = {
            "firsName": "Frederico",
            "lastName": "Vasconcelos",
            "email": "fred.vasconcelos321@gmail.com",
            "password": "xxxxxx"
        }

        const addedItem = await userRepo.add(newUser);
        console.log(addedItem);
        const addetItemQuery = await userRepo.getById(addedItem._id);
        console.log(addetItemQuery);

        const updatedItem = await userRepo.update(addedItem._id,{
            "firsName": "Fred",
            "lastName": "Vasconcelos",
            "email": "fred.vasconcelos321@gmail.com",
            "password": "xxxxxx"
        });

        const newUpdatedItem = await userRepo.getById(updatedItem._id);

        console.log(newUpdatedItem);

        const removed = await userRepo.remove(addedItem._id);
        console.log(removed);


    } catch( error ){
        console.log(error);
    } finally{
        const admin = client.db(dbName).admin();
        client.close();
    }
}

main();
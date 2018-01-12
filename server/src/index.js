import "reflect-metadata";
import { createConnection } from "typeorm";
import Person from "./entity/Person";
const { DB_USER, DB_PW, DB_HOST, DB_NAME } = process.env;
createConnection({
    type: 'postgres',
    host: DB_HOST,
    port: 5432,
    username: DB_USER,
    password: DB_PW,
    database: DB_NAME,
    entities: [
        __dirname + "/entity/*.js"
     ],
    migrations: [
        __dirname + "/migration/**/*.js"
     ],
    subscribers: [
        __dirname + "/migration/**/*.js"
    ],
    synchronize: true,
}).then(async connection => {

    console.log("Inserting a new person into the database...");
    const user = new Person();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a person with id: " + user.id);
    
    console.log("Loading people from the database...");
    const users = await connection.manager.find(Person);
    console.log("Loaded people: ", users);
     
    console.log("Here you can setup and run express/koa/any other framework.");
    console.log("Starting a loop");
    // temp to make the server stay up, will be replaced with express
    while (true) {
        
    }
    
}).catch(error => console.log(error));

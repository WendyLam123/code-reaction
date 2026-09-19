import mysql from "mysql2";

let db;

const connectToDatabase = () =>{
    if (!db){
        db =  mysql.createConnection({
            host: process.env.DB_HOST, 
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
    }
    return db;
};

export default connectToDatabase;
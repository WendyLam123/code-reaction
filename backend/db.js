import mysql from "mysql2";

let db;

const connectToDatabase = () => {
  if (!db) {
    db = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        ca: process.env.DB_CA_CERT
      },
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0
    });
  }

  return db;
};

export default connectToDatabase;
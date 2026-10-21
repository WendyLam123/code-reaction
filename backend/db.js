import mysql from "mysql2";

let db;

const connectToDatabase = () => {
  if (!db) {
    const config = {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0
    };

    if (process.env.DB_CA_CERT) {
      config.ssl = { ca: process.env.DB_CA_CERT };
    }

    db = mysql.createPool(config);
  }

  return db;
};

export default connectToDatabase;

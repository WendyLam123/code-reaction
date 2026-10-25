import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const caPath = path.join(currentDir, "certs", "ca.pem");
const ca = fs.readFileSync(caPath, "utf8");

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
        ca,
        rejectUnauthorized: true,
      },
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
    });
  }

  return db;
};

export default connectToDatabase;
import express from "express";
import connectToDatabase from "../db.js";
import { verifyToken } from "./auth.js";

const router = express.Router();
const db = connectToDatabase();

//Learn Page
//public
router.get("/", async (req, res, next) => {
  const sql = `
    SELECT level_page_id AS id, title, course_id
    FROM levels
  `;

  try {
    const [rows] = await db.query(sql);
    return res.json(rows);
  } catch (err) {
    return next(err);
  }
});
export default router;

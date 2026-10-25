import { verifyToken } from "./auth.js";
import express from "express";
import connectToDatabase from "../db.js";

const router = express.Router();

const db = connectToDatabase();

router.get("/userData", verifyToken, async (req, res, next) => {
  const sql = `
    SELECT username, email FROM users
    WHERE user_id = ?
  `;

  try {
    const [rows] = await db.query(sql, [req.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    //get user from [{user}]
    return res.status(200).json(rows[0]);
  } catch (err) {
    return next(err);
  }
});

export default router;

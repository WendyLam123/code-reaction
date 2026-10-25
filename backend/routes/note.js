import express from "express";
import connectToDatabase from "../db.js";
import { verifyToken } from "./auth.js";

const router = express.Router();
const db = connectToDatabase();

//Note
router.get("/", verifyToken, async (req, res, next) => {
  const sql = "SELECT * FROM notes WHERE user_id = ?";

  try {
    const [data] = await db.query(sql, [req.userId]);
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
});

//create new note row in Notes
router.post("/", verifyToken, async (req, res, next) => {
  const { title, body } = req.body;

  const sql = `
    INSERT INTO notes (user_id, title, body, last_modified)
    VALUES (?, ?, ?, NOW())
  `;

  try {
    const [result] = await db.query(sql, [req.userId, title, body]);

    return res.status(201).json({
      id: result.insertId,
      title,
      body,
      last_modified: new Date(),
    });
  } catch (err) {
    return next(err);
  }
});

//update note api when saved
router.put("/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id;
  const userId = req.userId;
  const { title, body } = req.body;

  const sql = `
    UPDATE notes
    SET title = ?, body = ?, last_modified = NOW()
    WHERE id = ? AND user_id = ?
  `;

  try {
    const [result] = await db.query(sql, [title, body, id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.json({
      message: "Note updated successfully",
    });
  } catch (err) {
    return next(err);
  }
});

//delete note from database
router.delete("/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id;

  const sql = `
    DELETE FROM notes
    WHERE id = ? AND user_id = ?
  `;

  try {
    const [result] = await db.query(sql, [id, req.userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.json({
      message: "Note deleted successfully",
    });
  } catch (err) {
    return next(err);
  }
});
export default router;

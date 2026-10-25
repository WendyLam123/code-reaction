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

router.get("/:levelId", async (req, res, next) => {
  const levelPageId = req.params.levelId;

  //initial:
  //get the levelPageId from param
  //get page(content, title, page_order...), get course title, get quiz(if have)

  const sql = `
        SELECT 
            levelPages.*,
            courses.title AS courses_title,

            quiz.id AS quiz_id,
            quiz.question,
            quiz.question_type,

            quizAnswers.id AS answer_id, 
            quizAnswers.answer, 
            quizAnswers.is_correct

        FROM levelPages

        LEFT JOIN quiz 
            ON levelPages_id = levelPages.id

        LEFT JOIN quizAnswers 
            ON quiz_id = quiz.id

        JOIN courses 
            ON levelPages.course_id = courses.id

        WHERE course_id = (
            SELECT course_id
            FROM levelPages
            WHERE id = ?
        )
        ORDER BY page_order ASC;
    `;

  try {
    const [rows] = await db.query(sql, [levelPageId]);
    return res.json(rows);
  } catch (err) {
    return next(err);
  }
});

router.post("/:quiz_id/tryQuiz", verifyToken, async (req, res, next) => {
  const quiz_id = req.params.quiz_id;
  const sql = `
        INSERT INTO quizStatistics (user_id, quiz_id, attempts)
        VALUES(?, ?, 1)

        ON DUPLICATE KEY UPDATE
        attempts = attempts + 1;
    `;
  try {
    const [result] = await db.query(sql, [req.userId, quizId]);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

router.post("/:quiz_id/completedQuiz", verifyToken, async (req, res, next) => {
  const quiz_id = req.params.quiz_id;

  const sql = `
        INSERT INTO quizStatistics (user_id, quiz_id, attempts, completed)
        VALUES(?, ?, 1, true)

        ON DUPLICATE KEY UPDATE
        completed = true
    `;
  try {
    const [result] = await db.query(sql, [req.userId, quizId]);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

router.get("/:levelId/next", async (req, res, next) => {
  const levelId = req.params.levelId;

  //get the next level id
  const sql = `
        SELECT id FROM levelPages
        WHERE id > ?
        ORDER BY id ASC
        LIMIT 1   
    `;

  //? is levelId

  try {
    const [rows] = await db.query(sql, [levelId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No next level found" });
    }

    return res.json(rows[0].id);
  } catch (err) {
    return next(err);
  }
});

//private, require login

export default router;

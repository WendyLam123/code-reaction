import express from "express";
import connectToDatabase from "../db.js";
import { verifyToken } from "./auth.js";

const router = express.Router();

const db = connectToDatabase();

//Learn Page
//public

router.get("/", async (req, res, next) => {
  const sql = `
    SELECT
      courses.id AS course_id,
      courses.title AS course_title,
      levels.id AS level_id,
      levels.level_page_order AS page_order,
      levels.title AS level_title
    FROM courses
    LEFT JOIN levels
      ON courses.id = levels.course_id
    ORDER BY courses.id, levels.level_page_order;
  `;

  try {
    const [data] = await db.query(sql);
    const coursesMap = new Map();

    data.forEach((row) => {
      //use course_id as temp coursesMap key
      //if course haven't put in the map, add it
      if (!coursesMap.has(row.course_id)) {
        coursesMap.set(row.course_id, {
          id: row.course_id,
          title: row.course_title,
          levels: [],
        });
      }

      //if course have put in the map, and have other related into, add the new info to the existed course
      if (row.level_id !== null) {
        coursesMap.get(row.course_id).levels.push({
          id: row.level_id,
          page_order: row.page_order,
          title: row.level_title,
        });
      }
    });

    //remove the temp key
    //return the organized course data: course_id, course title, levelId, level_page_order, level_title
    return res.json([...coursesMap.values()]);
  } catch (err) {
    return next(err);
  }
});

router.get("/:courseId", async (req, res, next) => {
  const { courseId } = req.params;

  const sql = `
        SELECT 
            levelPages.id,
            levelPages.content,
            levelPages.page_order,
            levelPages.page_type,

            courses.title AS course_title,

            quiz.id AS quiz_id,
            quiz.question,
            quiz.question_type,

            quizAnswers.id AS answer_id,
            quizAnswers.answer,
            quizAnswers.is_correct,

            games.id AS game_id,
            games.title AS game_title, 
            games.instructions AS game_instructions, 
            games.tips AS game_tips,
            games.code_blocks AS game_code_blocks, 
            games.answers AS game_answers

        FROM levelPages

        LEFT JOIN quiz
            ON levelPages.id = quiz.levelPages_id
        
        LEFT JOIN games
            ON levelPages.id = games.page_id

        LEFT JOIN quizAnswers
            ON quiz.id = quizAnswers.quiz_id

        JOIN courses
            ON levelPages.course_id = courses.id

        WHERE levelPages.course_id = ?

        ORDER BY levelPages.page_order ASC;
    `;

  try {
    const [data] = await db.query(sql, [courseId]);
    const pagesMap = new Map();

    data.forEach((row) => {
      // Create page
      if (!pagesMap.has(row.id)) {
        pagesMap.set(row.id, {
          id: row.id,
          content: row.content,
          page_order: row.page_order,
          page_type: row.page_type,
          course_title: row.course_title,
          quiz: null,
          game: null,
        });
      }

      const page = pagesMap.get(row.id);

      // Create quiz
      if (row.quiz_id !== null) {
        if (!page.quiz) {
          page.quiz = {
            id: row.quiz_id,
            question: row.question,
            question_type: row.question_type,
            answers: [],
          };
        }
      }

      // Add answer
      if (
        row.answer_id !== null &&
        page.quiz &&
        !page.quiz.answers.some((answer) => answer.id === row.answer_id)
      ) {
        page.quiz.answers.push({
          id: row.answer_id,
          answer: row.answer,
          is_correct: row.is_correct,
        });
      }

      // Create Game
      if (row.game_id !== null) {
        if (!page.game) {
          page.game = {
            id: row.game_id,
            title: row.game_title,
            instructions: row.game_instructions,
            tips: row.game_tips,
            code_blocks: row.game_code_blocks,
            answers: row.game_answers,
          };
        }
      }
    });

    const pages = [...pagesMap.values()];

    return res.json(pages);
  } catch (err) {
    return next(err);
  }
});

//private, require login
router.post("/:id/tryQuiz", verifyToken, async (req, res, next) => {
  const id = req.params.id;

  //if quiz is completed, don't update attempt
  //
  const sql = `
        INSERT INTO userProgress (user_id, page_id, attempts)
        VALUES(?, ?, 1)

        ON DUPLICATE KEY UPDATE
        attempts = IF(completed = 0, attempts + 1, attempts);
    `;

  try {
    const [data] = await db.query(sql, [req.userId, id]);
    return res.json(data);
  } catch (err) {
    return next(err);
  }
});

router.post("/:id/completedQuiz", verifyToken, async (req, res, next) => {
  const id = req.params.id;

  const sql = `
        INSERT INTO userProgress
            (user_id, page_id, attempts, completed, completed_at)
        VALUES (?, ?, 1, true, NOW())
        ON DUPLICATE KEY UPDATE
            completed = true,
            completed_at = NOW();
    `;

  try {
    const [data] = await db.query(sql, [req.userId, id]);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;

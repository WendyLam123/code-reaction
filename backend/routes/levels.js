import express from 'express';
import connectToDatabase from '../db.js';
import {verifyToken} from './auth.js';

const router = express.Router();

const db = connectToDatabase();


//Learn Page
//public
router.get('/', (req, res, next)=>{
    const sql = `
        SELECT level_page_id AS id, title, course_id
        FROM levels
    `;
    //use callback so need next(err)
    db.query(sql, (err, data)=>{
        if (err){
            return next(err);
        }
        return res.json(data);
    })
});

router.get('/:levelId', (req, res, next)=>{
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

        LEFT JOIN quiz ON levelPages_id = levelPages.id

        LEFT JOIN quizAnswers ON quiz_id = quiz.id

        JOIN courses ON levelPages.course_id = courses.id

        WHERE course_id = (
            SELECT course_id
            FROM levelPages
            WHERE id = ?
        )
        ORDER BY page_order ASC;
    `;

    db.query(sql, [levelPageId], (err, data)=>{
        if (err){
            return next(err);
        }
        return res.json(data);
    })
});

router.post('/:quiz_id/tryQuiz', verifyToken, (req, res, next)=>{
    const quiz_id = req.params.quiz_id;
    const sql = `
        INSERT INTO quizStatistics (user_id, quiz_id, attempts)
        VALUES(?, ?, 1)

        ON DUPLICATE KEY UPDATE
        attempts = attempts + 1;
    `

    db.query(sql, [req.userId, quiz_id], (err, data)=>{
        if (err){
            next(err);
        }

        console.log("updated");
        return res.json(data);

    })
})

router.post('/:quiz_id/completedQuiz', verifyToken, (req, res, next)=>{
    const quiz_id = req.params.quiz_id;
    const sql = `
        INSERT INTO quizStatistics (user_id, quiz_id, attempts, completed)
        VALUES(?, ?, 1, true)

        ON DUPLICATE KEY UPDATE
        completed = true
    `

    db.query(sql, [req.userId, quiz_id], (err, data)=>{
        if (err){
            next(err);
        }

        return res.json(data);

    })
})

router.get('/:levelId/next', (req, res, next)=>{
    const levelId = req.params.levelId;

    //get the next level id
    const sql = `
        SELECT id FROM levelPages
        WHERE id > ?
        ORDER BY id ASC
        LIMIT 1   
        `;

    //? is levelId
    db.query(sql, [levelId], (err, data)=>{
        if (err){
            return next(err);
        }

        //if there is no next level, return null
        if (data.length === 0){
            return res.json("something goes wrong");
        }

        return res.json(data[0].id);
    })
})


//private, require login

export default router;
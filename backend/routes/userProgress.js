import {verifyToken} from "./auth.js";
import express from 'express';
import connectToDatabase from '../db.js';

const router = express.Router();

const db = connectToDatabase();

router.get("/userData", verifyToken, (req, res, next)=>{
    let sql = `
        SELECT username, email FROM users
        WHERE user_id = ?
    `;

    db.query(sql, [req.userId], (err, rows)=>{
        if (err){
            return next(err);
        };

        //check if user still exist, not deleted after got the token
        if (rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json(rows[0]);
    })
})

export default router;
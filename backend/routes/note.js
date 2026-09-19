import express from 'express';
import connectToDatabase from '../db.js';
import {verifyToken} from './auth.js';

const router = express.Router();

const db = connectToDatabase();

//updated get and post, need to add verify to the other

//Note
router.get("/", verifyToken, (req, res, next)=>{
    const sql = "SELECT * FROM notes WHERE user_id = ?";
    db.query(sql, [req.userId], (err, rows) =>{
        if (err){
            return next(err);
        }
        return res.status(200).json(rows);
    })
})

//create new note row in Notes
router.post("/", verifyToken, (req, res, next) => {
    const {title, body} = req.body;

    const sql = `
        INSERT INTO  notes (user_id, title, body, last_modified)
        VALUES (?, ?, ?, NOW())
    `;

    db.query(sql, [req.userId, title, body], (err, data)=>{
        if (err){
            return next(err);
        }

        return res.status(201).json({
            id: data.insertId,
            title: title, 
            body: body, 
            last_modified: new Date()
        })
    })
})

//update note api when saved
router.put("/:id", verifyToken, (req, res) => {
    const id = req.params.id;
    const user_id = req.userId;
    const {title, body} = req.body;

    const sql = `
        UPDATE  notes
        SET title = ?, body = ?, last_modified = NOW()
        WHERE id = ? AND user_id = ?
    `;

    //console.log(sql);

    db.query(sql, [title, body, id, user_id], (err, data)=>{
        if (err){
            return next(err);
        }

        //check if note is found and updated
        if (data.affectedRows === 0){
            return res.status(404).json({
                message: "Note not found"
            });
        }

        return res.json({
            message: "Note updated successfully"
        })
    })
})

//delete note from database
router.delete("/:id", verifyToken , (req, res) => {
    const id = req.params.id;

    const sql = `
        DELETE  FROM notes
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [id, req.userId], (err, data)=>{
        if (err){
            return next(err);
        }

        if (data.affectedRows === 0){
            return res.status(404).json({
                message: "note not found"
            })
        }

        return res.json({
            message: "Note deleted successfully"
        })
    })
})

export default router;
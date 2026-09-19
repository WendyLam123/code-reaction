import express from 'express';
import connectToDatabase from '../db.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const db = connectToDatabase();
// Register route
router.post('/register', (req, res, next) => {
    const {username, email, password} = req.body;
    let sql = 'SELECT * FROM users WHERE email = ?';
    
    db.query(sql, [email], async(err, rows)=>{
        if (err){
            return next(err);
        };
        
        //check if user already exists
        if (rows.length >0){
            return res.status(409).json({message: "User already exists"});
        }

        //new user: hash password and insert into database
        const hashPassword = await bcrypt.hash(password, 10);
        sql = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)" 
        db.query(sql, [username, email, hashPassword], (err, rows)=>{
            if (err){
                return next(err);
            };
            return res.status(201).json({message: "User created successfully"})
        })

    })
});

router.post('/login', (req, res, next) => {
    const {email, password} = req.body;
    let sql = 'SELECT * FROM users WHERE email = ?';
    
    db.query(sql, [email], async(err, rows)=>{
        if (err){
            return next(err);
        };
        
        //check if user does not exists
        if (rows.length === 0){
            return res.status(404).json({message: "User does not exists"});
        }

        //check if the password is correct
        const isMatch = await bcrypt.compare(password, rows[0].password)
        if (!isMatch){
            return res.status(401).json({message:"Wrong Password, Try Again!"})
        }
        //create jwt token
        const token = jwt.sign({id: rows[0].user_id}, process.env.JWT_KEY, {expiresIn: "3h"});
        
        return res.status(201).json({token: token})
    })
})

const verifyToken = (req, res, next) =>{
    try{
        //console.log("verifyToken processing")

        const authHeader = req.headers.authorization;
        //console.log("authHeader", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                message: "No Token Provided"
            });
        }

        //Remove the Bearer, get the token
        const token = authHeader.split(' ')[1];

        if (!token){
            return res.status(401).json({message: "No Token Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        req.userId = decoded.id;
        //console.log("req.userId: ", req.userId);

        next();

    } catch(err){
        return res.status(401).json({message: "token invalid/expired"})
    }
}

export default router;
export {verifyToken};
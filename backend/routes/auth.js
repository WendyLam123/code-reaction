import express from 'express';
import connectToDatabase from '../db.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const db = connectToDatabase();

// Register route
router.post('/register', async(req, res, next) => {
    const {username, email, password} = req.body;

    let sql = 'SELECT user_id FROM users WHERE email = ?';
    
    try{
        const [users] = await db.query(sql, [email]);

        //check if user already exists
        if (users.length > 0){
            return res.status(409).json({message: "User already exists"});
        }

        //new user: hash password and insert into database
        const hashPassword = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO users(username, email, password) VALUES (?, ?, ?)" , 
            [username, email, hashPassword]);

        return res.status(201).json({message: "User created successfully"})

    }catch(err){
        return next(err);
    }
});

router.post('/login', async(req, res, next) => {
    const {email, password} = req.body;
    
    try{
        let sql = 'SELECT * FROM users WHERE email = ?';
        const [users] = await db.query(sql, [email]);

        const user = users[0];

        //check if user does not exists
        if (users.length === 0){
            return res.status(404).json({message: "User does not exists"});
        }

        //check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.status(401).json({message:"Wrong Password, Try Again!"})
        }

        //create jwt token
        const token = jwt.sign({id: user.user_id}, process.env.JWT_KEY, {expiresIn: "1h"});
        
        return res.status(200).json({token: token})
    }catch(err){
        return next(err);
    }
})

const verifyToken = (req, res, next) =>{
    
    const authHeader = req.headers.authorization;

    //no authHeader
    if (!authHeader){
        return res.status(401).json({message: "Bearer Token Required"})
    }

    const [bearer, token] = authHeader.split(" ");

    //no token / wrong scheme
    if (bearer !== "Bearer" || !token){
        return res.status(401).json({message: "Bearer Token Required"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        return next();
    } catch(err){
        return res.status(401).json({message: "token invalid or expired"})
    }
}

export default router;
export {verifyToken};
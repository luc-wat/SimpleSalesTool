import { Router } from "express";
import pool from "../db.js";
import { body } from "express-validator";

const router = Router();

router.post('/register', [
    body('email')
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .isLength({ max: 160 })
        .withMessage("Email must be less than 160 characters"), 
    body('password')
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6, max: 160 })
        .withMessage("Password must be between 6 and 160 characters")
    ], 
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const newUser = await pool.query("INSERT INTO users (email, password) VALUES ($1, crypt($2, gen_salt('md5'))) RETURNING *", [email, password]);
            res.status(200).json(newUser.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
    }
);

router.post('/login', [
    body('email')
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .isLength({ max: 160 })
        .withMessage("Email must be less than 160 characters"), 
    body('password')
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6, max: 160 })
        .withMessage("Password must be between 6 and 150 characters")
    ], 
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await pool.query("SELECT * FROM users WHERE email = $1 AND password = crypt($2, password)", [email, password]);
            if (user.rows.length === 0) {
                return res.status(401).send("Invalid credentials");
            }
            res.status(200).json(user.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
    }
);

export default router;
import { Router } from "express";
import pool from "../db.js";
import { body } from "express-validator";

const router = Router();

router.post("/", [
    body('name')
        .notEmpty()
        .withMessage("Customer name is required")
        .isLength({ max: 80 })
        .withMessage("Customer name must be less than 80 characters"),
    body('email')
        .notEmpty()
        .withMessage("Customer email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .isLength({ max: 160 })
        .withMessage("Customer email must be less than 160 characters")
    ], 
    async (req, res) => {
        try {
            const { name, email } = req.body;
            const newCustomer = await pool.query("INSERT into customers (name, email) VALUES ($1, $2) RETURNING *", [name, email]);
            res.status(200).json(newCustomer.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
    }
);

router.get("/", async (req, res) => {
    try {
        const allCustomers = await pool.query("SELECT * FROM customers");
        res.status(200).json(allCustomers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

router.patch("/:id", [
    body('name')
        .notEmpty()
        .withMessage("Customer name is required")
        .isLength({ max: 80 })
        .withMessage("Customer name must be less than 80 characters"),
    body('email')
        .notEmpty()
        .withMessage("Customer email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .isLength({ max: 160 })
        .withMessage("Customer email must be less than 160 characters")
    ], 
    async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            const updateCustomer = await pool.query(
                "UPDATE customers SET name = $1, email = $2 WHERE customer_id = $3 RETURNING *",
                [name, email, id]
            );

            if (updateCustomer.rows.length === 0) {
                return res.status(404).json({ msg: "Customer not found" });
            }

            res.status(200).json(updateCustomer.rows[0])
        } catch (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
    }
);

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM customers WHERE customer_id = $1", [id]);
        res.status(200).json({ msg: "Customer was deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

export default router;
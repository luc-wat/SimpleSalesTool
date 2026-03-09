import { Router } from "express";
import pool from "../db.js";
import { body } from "express-validator";

const router = Router();

router.post("/", [
    body('customerName')
        .notEmpty()
        .withMessage("Customer name is required")
        .isLength({ max: 80 })
        .withMessage("Customer name must be less than 80 characters"),
    body('customerEmail')
        .notEmpty()
        .withMessage("Customer email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .isLength({ max: 160 })
        .withMessage("Customer email must be less than 160 characters"),
    body('createdDate')
        .notEmpty()
        .withMessage("Created date is required")
        .isDate()
        .withMessage("Created date must be a valid date in the format MM-DD-YYYY"),
    body('contractStartDate')
        .notEmpty()
        .withMessage("Contract start date is required")
        .isDate({ format: "MM-DD-YYYY"})
        .withMessage("Contract start date must be a valid date in the format MM-DD-YYYY"),
    body('contractEndDate')
        .notEmpty()
        .withMessage("Contract end date is required")
        .isDate()
        .withMessage("Contract end date must be a valid date in the format MM-DD-YYYY"),
    body('status')
        .optional()
    ], 
    async (req, res) => {
        try {
            const { createdDate, contractStartDate, contractEndDate, status, customerName, customerEmail } = req.body;
            const customerIds = await pool.query("SELECT customer_id FROM customers WHERE name=$1 AND email=$2", [customerName, customerEmail]);

            if (customerIds.rows.length == 0) {
                throw new Error("Customer could not be found");
            }

            const newSale = await pool.query(
                "INSERT into sales (created_date, contract_start_date, contract_end_date, status, customer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
                [createdDate, contractStartDate, contractEndDate, status || "active", customerIds.rows[0].customer_id]
            );

            res.status(200).json(newSale.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
    }
);

router.get("/", async (req, res) => {
    try {
        const allSales = await pool.query("SELECT sales.sale_id, sales.created_date, sales.contract_start_date, sales.contract_end_date, sales.status, customers.name, customers.email FROM sales INNER JOIN customers ON sales.customer_id=customers.customer_id;");
        res.status(200).json(allSales.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await pool.query("SELECT * FROM sales WHERE sale_id = $1", [id]);
        
        if (sale.rows.length === 0) {
            return res.status(404).json({ msg: "Sale not found" });
        }

        res.status(200).json(sale.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

router.patch("/:id", [
    body('customerName')
        .notEmpty()
        .withMessage("Customer name is required")
        .isLength({ max: 80 })
        .withMessage("Customer name must be less than 80 characters"),
    body('customerEmail')
        .notEmpty()
        .withMessage("Customer email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .isLength({ max: 160 })
        .withMessage("Customer email must be less than 160 characters"),
    body('createdDate')
        .notEmpty()
        .withMessage("Created date is required")
        .isDate({ format: "MM-DD-YYYY"})
        .withMessage("Created date must be a valid date in the format MM-DD-YYYY"),
    body('contractStartDate')
        .notEmpty()
        .withMessage("Contract start date is required")
        .isDate({ format: "MM-DD-YYYY"})
        .withMessage("Contract start date must be a valid date in the format MM-DD-YYYY"),
    body('contractEndDate')
        .notEmpty()
        .withMessage("Contract end date is required")
        .isDate()
        .withMessage("Contract end date must be a valid date in the format MM-DD-YYYY"),
    body('status')
        .optional()
    ], 
    async (req, res) => {
        try {
            const { id } = req.params;
            const { createdDate, contractStartDate, contractEndDate, status, customerName, customerEmail } = req.body;
            const customerIds = await pool.query("SELECT customer_id FROM customers WHERE name=$1 AND email=$2", [customerName, customerEmail]);

            if (customerIds.rows.length == 0) {
                throw error("Customer could not be found");
            }

            const updateSale = await pool.query(
                "UPDATE sales SET created_date = $1, contract_start_date = $2, contract_end_date = $3, status = $4, customer_id = $5 WHERE sale_id = $6 RETURNING *",
                [createdDate, contractStartDate, contractEndDate, status || "active", customerIds.rows[0].customer_id, id]
            );

            if (updateSale.rows.length === 0) {
                return res.status(404).json({ msg: "Sale not found" });
            }

            res.status(200).json(updateSale.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
    }
);

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM sales WHERE sale_id = $1", [id]);
        res.status(200).json({ msg: "Sale was deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
})

export default router;
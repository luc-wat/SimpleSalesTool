import express from 'express'
import cors from "cors";
import customersRoutes from "./routes/customers.js";
import salesRoutes from "./routes/sales.js";
import authRoutes from "./routes/auth.js";

export function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/customers", customersRoutes);
    app.use("/sales", salesRoutes);
    app.use("/", authRoutes);

    return app;
}
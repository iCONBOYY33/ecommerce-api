import express from "express";
import cors from "cors";

import productRoutes from "./modules/products/product.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import orderRoutes from "./modules/orders/order.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

// 🔥 FIRST ROUTE CONNECTION
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
// test route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// error handler
app.use(errorMiddleware);

export default app;

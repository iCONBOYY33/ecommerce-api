import { Router } from "express";
import { OrderController } from "./order.controller.js";
import { protect } from "../../middlewares/require-auth.middleware.js";

const router = Router();

router.post("/", protect, OrderController.create);
router.get("/", protect, OrderController.getAll);
router.get("/:id", protect, OrderController.getOrderById);
router.delete("/:id", protect, OrderController.removeOrder);

export default router;

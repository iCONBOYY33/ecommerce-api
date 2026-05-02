import { Router } from "express";
import { ProductController } from "./product.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "./product.validator.js";

const router = Router();

router.get("/", ProductController.getAll);

router.get("/:id", ProductController.getById);

router.post("/", validate(createProductSchema), ProductController.create);
router.patch("/:id", validate(updateProductSchema), ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;

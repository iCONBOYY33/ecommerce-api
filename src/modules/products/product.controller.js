import { ProductService } from "./product.service.js";

export const ProductController = {
  async getAll(req, res, next) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },
  async getById(req, res, next) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const product = await ProductService.updateProduct(
        req.params.id,
        req.body,
      );
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await ProductService.deleteProduct(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};

import { ProductRepository } from "./product.repository.js";

export const ProductService = {
  async getAllProducts() {
    return ProductRepository.findAll();
  },

  async getProductById(id) {
    if (!id) throw new Error("Product ID required");

    const product = await ProductRepository.findById(id);

    if (!product) throw new Error("Product not found");

    return product;
  },
  async createProduct(data) {
    // business logic example
    if (data.price > 10000) {
      throw new Error("Price too high");
    }

    return ProductRepository.create(data);
  },
  async updateProduct(id, data) {
    const existing = await ProductRepository.findById(id);
    if (!existing) throw new Error("Product not found");

    return ProductRepository.update(id, data);
  },

  async deleteProduct(id) {
    const exists = await ProductRepository.findById(id);
    if (!exists) throw new Error("Product not found");

    await ProductRepository.delete(id);
    return { message: "Product deleted" };
  },
};

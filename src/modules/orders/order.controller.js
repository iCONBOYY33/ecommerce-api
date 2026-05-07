import { OrderService } from "./order.service.js";

export const OrderController = {
  async create(req, res, next) {
    try {
      const userId = req.userId; // ← auth already exists
      const order = await OrderService.createOrder({ ...req.body, userId });
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  },
  async getAll(req, res, next) {
    try {
      const userId = req.userId;
      const orders = await OrderService.getAllOrders(userId);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  },
  async getOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },

  async removeOrder(req, res, next) {
    try {
      const { id } = req.params;
      const order = await OrderService.removeOrder(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
};

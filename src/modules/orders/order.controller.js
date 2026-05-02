import { OrderService } from "./order.service.js";

export const OrderController = {
  async create(req, res, next) {
    try {
      const order = await OrderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  },
};

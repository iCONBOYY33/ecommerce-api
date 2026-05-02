import { db } from "../../config/database.js";

export const OrderRepository = {
  async create({ totalPrice, items }) {
    return db.order.create({
      data: {
        totalPrice,
        items: {
          create: items,
        },
      },
      include: {
        items: true,
      },
    });
  },
};

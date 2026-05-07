import { db } from "../../config/database.js";

export const OrderRepository = {
  async create({ totalPrice, userId, items }) {
    return db.order.create({
      data: {
        totalPrice,
        userId,
        items: {
          create: items,
        },
      },
      include: {
        items: true,
      },
    });
  },
  async findAll() {
    return db.order.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        totalPrice: true,
        createdAt: true,
        items: {
          select: {
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                title: true,
                price: true,
                image: true,
              },
            },
          },
        },
      },
    });
  },
  async findById(id) {
    return db.order.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        totalPrice: true,
        createdAt: true,
        items: {
          select: {
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                title: true,
                price: true,
                image: true,
              },
            },
          },
        },
      },
    });
  },
  async removeOrder(id) {
    return db.$transaction([
      db.orderItem.deleteMany({ where: { orderId: id } }),
      db.order.delete({ where: { id } }),
    ]);
  },
};

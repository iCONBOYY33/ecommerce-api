import { ProductRepository } from "../products/product.repository.js";
import { OrderRepository } from "./order.repository.js";

// 🔥 helper function
function mergeItems(items) {
  const map = new Map();

  for (const item of items) {
    if (map.has(item.productId)) {
      map.get(item.productId).quantity += item.quantity;
    } else {
      map.set(item.productId, { ...item });
    }
  }

  return Array.from(map.values());
}

export const OrderService = {
  async createOrder(data) {
    const { items } = data;

    if (!items || items.length === 0) {
      throw new Error("Order must have items");
    }
    if (items.quantity <= 0) {
      throw new Error("Invalid quantity");
    }

    // 🔥 STEP 1: merge duplicates
    const mergedItems = mergeItems(items);

    let totalPrice = 0;
    const orderItemsData = [];

    // 🔥 STEP 2: process clean data
    for (const item of mergedItems) {
      const product = await ProductRepository.findById(item.productId);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      const itemTotal = product.price * item.quantity;
      totalPrice += itemTotal;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price, // snapshot
      });
    }

    return OrderRepository.create({
      totalPrice,
      userId: data.userId,
      items: orderItemsData,
    });
  },
  async getAllOrders() {
    return OrderRepository.findAll();
  },
  async getOrderById(id) {
    return OrderRepository.findById(id);
  },

  async removeOrder(id) {
    const order = await OrderRepository.findById(id);

    if (!order) {
      throw new Error("Order not found");
     }

    // 🔥 Step 1: validate status
    if (order.status !== "PENDING") {
      throw new Error("Order cannot be deleted (not PENDING)");
    }


    // 🔥 STEP 2: remove from storage
    await OrderRepository.removeOrder(id);

    // 🔥 STEP 3: return success
    return {
      success: true,
      message: "Order deleted successfully",
    };
  },
};

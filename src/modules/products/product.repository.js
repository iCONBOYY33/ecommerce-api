// const fakeDB = [
//   {
//     id: "1",
//     title: "Test Product",
//     price: 100,
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     id: "2",
//     title: "Another Product",
//     price: 200,
//     image: "https://via.placeholder.com/150",
//   },
// ];
import { db } from "../../config/database.js";

export const ProductRepository = {
  async findAll() {
    return db.product.findMany();
  },

  async findById(id) {
    return db.product.findUnique({ where: { id } });
  },
  async create(data) {  
    return db.product.create({ data });

    // const newProduct = {
    //   id: String(fakeDB.length + 1),
    //   ...data,
    // };

    // fakeDB.push(newProduct);
    // return newProduct;
  },

  async update(id, data) {
    return db.product.update({ where: { id }, data });
    
    // const index = fakeDB.findIndex((p) => p.id === id);

    // if (index === -1) return null;

    // fakeDB[index] = { ...fakeDB[index], ...data };
    // return fakeDB[index];
  },

  async delete(id) {
    return db.product.delete({ where: { id } });

    // const index = fakeDB.findIndex((p) => p.id === id);

    // if (index === -1) return false;

    // fakeDB.splice(index, 1);
    // return true;
  },
};

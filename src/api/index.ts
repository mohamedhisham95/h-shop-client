// User
import { signin } from "api/auth/auth";

// Products
import { getAllProductsByLimit, getProduct } from "api/product/product";

// Category
import { getAllCategory, getCategoryById } from "api/category/category";

// Cart
import { getCartProducts } from "api/cart/cart";

// Order
import { createOrder, getMyOrders, getMyOrderById } from "api/order/order";

// Admin
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "api/admin/products";
import { createCategory, updateCategory } from "api/admin/category";
import { getAllOrders, getOrderById, updateOrderStatus } from "api/admin/order";
import {
  getProductCountByCategory,
  getOrderCountFromSpecificDays,
  getUserCountFromSpecificDays,
} from "api/admin/dashboard";

export {
  // User
  signin,
  // Products
  getAllProductsByLimit,
  getProduct,
  // Category
  getAllCategory,
  getCategoryById,
  // Cart
  getCartProducts,
  // Order
  createOrder,
  getMyOrders,
  getMyOrderById,
  // Admin
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getProductCountByCategory,
  getOrderCountFromSpecificDays,
  getUserCountFromSpecificDays,
};

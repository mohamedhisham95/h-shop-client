// Auth
import { signin, signup } from "api/auth/auth";

// Products
import { getAllProductsByLimit, getProduct } from "api/product/product";

// Category
import { getAllCategory, getCategoryById } from "api/category/category";

// Cart
import { getCartProducts } from "api/cart/cart";

// Order
import { createOrder, getMyOrders, getMyOrderById } from "api/order/order";

// Review
import { getReviews, addReview, deleteReview } from "api/review/review";

// User
import { getUserProfile, changePassword, updateProfile } from "api/user/user";

// Admin
import { getAllUsers } from "api/admin/user";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "api/admin/products";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "api/admin/category";
import { getAllOrders, getOrderById, updateOrderStatus } from "api/admin/order";
import {
  getProductCountByCategory,
  getOrderCountFromSpecificDays,
  getUserCountFromSpecificMonths,
  getSalesStatFromSpecificMonths,
} from "api/admin/dashboard";
import { imageUpload } from "api/admin/upload";

export {
  // Auth
  signin,
  signup,
  // User
  getUserProfile,
  changePassword,
  updateProfile,
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
  // Review
  getReviews,
  addReview,
  deleteReview,
  // Admin
  getAllUsers,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getProductCountByCategory,
  getOrderCountFromSpecificDays,
  getUserCountFromSpecificMonths,
  getSalesStatFromSpecificMonths,
  imageUpload,
};

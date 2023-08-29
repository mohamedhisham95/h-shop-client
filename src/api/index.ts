// User
import { signin } from "api/auth/auth";

// Products
import { getAllProductsByLimit, getProduct } from "api/product/product";

// Category
import { getAllCategory } from "api/category/category";

// Cart
import { getCartProducts } from "api/cart/cart";

// Admin
import { getAllProducts, createProduct } from "api/admin/products";
import { createCategory } from "api/admin/category";

export {
  // User
  signin,
  // Products
  getAllProductsByLimit,
  getProduct,
  // Category
  getAllCategory,
  // Cart
  getCartProducts,
  // Admin
  getAllProducts,
  createProduct,
  createCategory,
};

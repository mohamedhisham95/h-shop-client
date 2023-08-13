// User
import { signin } from "api/auth/auth";

// Products
import { getProducts, getProduct } from "api/product/product";

// Cart
import { getCartProducts } from "api/cart/cart";

// Admin
import { getAllProducts } from "api/admin/products";

export {
  // User
  signin,
  // Products
  getProducts,
  getProduct,
  // Cart
  getCartProducts,
  // Admin
  getAllProducts,
};

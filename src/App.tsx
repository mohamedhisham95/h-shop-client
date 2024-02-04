import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styles
import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.scss";

// Routes
import AuthRoute from "routes/AuthRoute";
import AdminRoute from "routes/AdminRoute";
import ProtectedRoute from "routes/ProtectedRoute";

// Components
import Header from "components/layout/Header";

// Pages
import Home from "pages/Home";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import Product from "pages/Product";
import Cart from "pages/Cart";
import Checkout from "pages/Checkout";
import PageNotFound from "pages/PageNotFound";

// User Pages
import MyOrderList from "pages/user/MyOrderList";
import MyOrder from "pages/user/MyOrder";
import Profile from "pages/user/Profile";

// Admin Pages
import Dashboard from "pages/admin/Dashboard";
import ProductList from "pages/admin/product/ProductList";
import ProductCreate from "pages/admin/product/ProductCreate";
import ProductEdit from "pages/admin/product/ProductEdit";
import CategoryList from "pages/admin/category/CategoryList";
import CategoryCreate from "pages/admin/category/CategoryCreate";
import CategoryEdit from "pages/admin/category/CategoryEdit";
import OrderList from "pages/admin/order/OrderList";
import Order from "pages/admin/order/Order";
import UserList from "pages/admin/user/UserList";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          {/* Public Route */}
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" exact component={Product} />
          <Route path="/cart" exact component={Cart} />
          {/* Auth Route */}
          <AuthRoute path="/signin" exact component={SignIn} />
          <AuthRoute path="/signup" exact component={SignUp} />
          {/* Protected Route */}
          <ProtectedRoute path="/checkout" exact component={Checkout} />
          <ProtectedRoute path="/my-orders" exact component={MyOrderList} />
          <ProtectedRoute path="/my-order/:id" exact component={MyOrder} />
          <ProtectedRoute path="/profile" exact component={Profile} />
          {/* Admin Route */}
          <AdminRoute path="/admin/dashboard" exact component={Dashboard} />
          <AdminRoute
            path="/admin/product/list"
            exact
            component={ProductList}
          />
          <AdminRoute
            path="/admin/product/create"
            exact
            component={ProductCreate}
          />
          <AdminRoute
            path="/admin/product/edit/:id"
            exact
            component={ProductEdit}
          />
          <AdminRoute
            path="/admin/category/list"
            exact
            component={CategoryList}
          />
          <AdminRoute
            path="/admin/category/create"
            exact
            component={CategoryCreate}
          />
          <AdminRoute
            path="/admin/category/edit/:id"
            exact
            component={CategoryEdit}
          />
          <AdminRoute path="/admin/order/list" exact component={OrderList} />
          <AdminRoute path="/admin/order/:id" exact component={Order} />
          <AdminRoute path="/admin/user/list" exact component={UserList} />

          {/* 404 - Page Not Found */}
          <Route path="*" component={PageNotFound} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;

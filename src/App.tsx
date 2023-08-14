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
import Product from "pages/Product";
import Cart from "pages/Cart";
import Checkout from "pages/Checkout";
import Products from "pages/admin/product/Products";
import ProductCreate from "pages/admin/product/ProductCreate";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:productId" exact component={Product} />
          <Route path="/cart" exact component={Cart} />
          <AuthRoute path="/signin" exact component={SignIn} />
          <ProtectedRoute path="/checkout" exact component={Checkout} />
          <AdminRoute path="/admin/products" exact component={Products} />
          <AdminRoute
            path="/admin/product/create"
            exact
            component={ProductCreate}
          />
        </Switch>
      </main>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styles
import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.scss";

// Routes
import AuthRoute from "routes/AuthRoute";
import AdminRoute from "routes/AdminRoute";

// Components
import Header from "components/layout/Header";

// Pages
import Home from "pages/Home";
import SignIn from "pages/SignIn";
import Product from "pages/Product";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:productId" exact component={Product} />
          <AuthRoute path="/signin" component={SignIn} />
          {/* <AdminRoute path="/profile/:userId" component={Profile} /> */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;

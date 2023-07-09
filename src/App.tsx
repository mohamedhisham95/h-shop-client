import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styles
import "bootswatch/dist/flatly/bootstrap.min.css";
import "./App.scss";

// Routes
import AuthRoute from "routes/AuthRoute";
import AdminRoute from "routes/AdminRoute";

// Components
import Header from "components/layout/Header";

// Pages
import Home from "pages/Home";
import SignIn from "pages/SignIn";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <AuthRoute path="/signin" component={SignIn} />
          {/* <AdminRoute path="/profile/:userId" component={Profile} /> */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;

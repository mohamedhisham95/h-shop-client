import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

// Components
import Header from "components/layout/Header";

// Pages
import Home from "pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Header />
        <Route path="/" exact component={Home} />
        {/* <AuthRoute path="/login" component={Login} />
            <ProtectedRoute path="/profile/:userId" component={Profile} /> */}
      </Switch>
    </Router>
  );
}

export default App;

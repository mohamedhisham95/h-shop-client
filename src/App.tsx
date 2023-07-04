import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// CSS & SCSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Pages
import Home from "pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <AuthRoute path="/login" component={Login} />
            <ProtectedRoute path="/profile/:userId" component={Profile} /> */}
      </Switch>
    </Router>
  );
}

export default App;

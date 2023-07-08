import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styles
import "bootswatch/dist/flatly/bootstrap.min.css";
import "./App.scss";

// Components
import Header from "components/layout/Header";

// Pages
import Home from "pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <AuthRoute path="/login" component={Login} />
            <ProtectedRoute path="/profile/:userId" component={Profile} /> */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;

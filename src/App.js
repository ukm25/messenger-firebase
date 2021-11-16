import {
  useLocation,
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import Login from "./Login";
import { RoomList } from "./Messenger";
import { SecureRoute } from "./SecureRoute";

function App() {
  let location = useLocation();
  return (
    <Router style={{ height: "100%",  }}>
      <Redirect to={{ pathname: "/message", state: { from: location } }} />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <SecureRoute path="/message">
          <RoomList />
        </SecureRoute>
        <SecureRoute path="/add-room"></SecureRoute>
        <SecureRoute path="/chat-room/:room"></SecureRoute>
      </Switch>
    </Router>
  );
}

export default App;

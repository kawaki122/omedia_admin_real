import SidebarLayout from './common/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Brand from './brand/brand';
import City from './city/city';
import Client from './client/client';

function App() {
  return (
    <Router>
    <SidebarLayout>
      <Switch>
        <Route exact path="/">
          <Brand />
        </Route>
        <Route path="/cities">
          <City />
        </Route>
        <Route path="/clients">
          <Client />
        </Route>
        </Switch>
      </SidebarLayout>
  </Router>
  );
}

export default App;

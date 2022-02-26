import SidebarLayout from './common/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Brand from './brand/brand';
import City from './city/city';
import Client from './client/client';
import Campaign from './campaign/campaign';

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
        <Route path="/campaigns">
          <Campaign />
        </Route>
        </Switch>
      </SidebarLayout>
  </Router>
  );
}

export default App;

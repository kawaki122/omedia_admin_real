import SidebarLayout from './common/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Campaign from './campaign/campaign';
import { Dashboard } from './dashboard/dashboard';
import { Provider } from 'react-redux';
import store from './store/reducers/store';

function App() {
  return <Provider store={store}>
    <Router>
      <SidebarLayout>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/campaigns">
            <Campaign />
          </Route>
        </Switch>
      </SidebarLayout>
    </Router>
  </Provider>
}

export default App;

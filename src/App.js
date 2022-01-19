import SidebarLayout from './common/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Brand from './brand/brand';

function App() {
  return (
    <Router>
    <SidebarLayout>
      <Switch>
        <Route path="/">
          <Brand />
        </Route>
        </Switch>
      </SidebarLayout>
  </Router>
  );
}

export default App;

import React from "react";
import SidebarLayout from "./common/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Campaign from "./campaign/campaign";
import { Dashboard } from "./dashboard/dashboard";
import { useSelector } from "react-redux";
import Splash from "./common/Splash";
import CampaignDetail from "./campaign/CampaignDetail";
import Settings from "./settings/Settings";
import Login from "./common/Login";

function Routes() {
  const { splash } = useSelector((item) => item.dashboard);

  if (splash) {
    return <Splash />;
  }
  return (
    <Router>
      <SidebarLayout>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/campaigns">
            <Campaign />
          </Route>
          <Route path="/campaign_detail">
            <CampaignDetail />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </SidebarLayout>
    </Router>
  );
}

export default Routes;

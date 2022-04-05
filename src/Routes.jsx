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
import PrivateRoute from "./common/PrivateRoute";
import PublicRoute from "./common/PublicRoute";

function Routes() {
  const { splash } = useSelector((item) => item.dashboard);

  if (splash) {
    return <Splash />;
  }
  return (
    <Router>
      <SidebarLayout>
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/campaigns" component={Campaign} />
          <PrivateRoute path="/campaign_detail" component={CampaignDetail} />
          <PrivateRoute path="/settings" component={Settings} />
        </Switch>
      </SidebarLayout>
    </Router>
  );
}

export default Routes;

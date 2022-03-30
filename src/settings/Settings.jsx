import React from "react";
import { Tabs, Radio, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import Security from "./Security";

const { TabPane } = Tabs;

function Settings() {
  return (
    <Tabs tabPosition="left" defaultActiveKey="1">
      <TabPane
        tab={
          <span>
            <SettingOutlined />
            Security
          </span>
        }
        key="1"
      >
        <Security />
      </TabPane>
    </Tabs>
  );
}

export default Settings;

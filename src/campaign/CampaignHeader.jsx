import React from "react";
import { PageHeader, Button, Descriptions, Tabs, Tag } from "antd";
import { urlHelper } from "../utils/UrlHelper";

const { TabPane } = Tabs;

const routes = [
  {
    path: "/",
    breadcrumbName: "campaigns",
  },
  {
    path: "campaign_detail",
    breadcrumbName: "campaign_detail",
  },
];

function CampaignHeader({ activeTab, setActiveTab, campaign }) {
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        breadcrumb={{ routes }}
        onBack={() => window.history.back()}
        title={campaign.title}
        subTitle={campaign.brandTitle+"'s Campaign details"}
        avatar={{
          src: urlHelper.fileUrl(campaign.img),
        }}
        tags={<Tag color="blue">{campaign.status}</Tag>}
        extra={[
          <Button key="2">
            Complete
          </Button>,
          <Button key="1" type="danger">
            Cancel
          </Button>,
        ]}
        footer={
          <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Locations" key="1" />
            <TabPane tab="Complaints" key="2" />
            <TabPane tab="Competition" key="3" />
          </Tabs>
        }
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Client">{campaign.client}</Descriptions.Item>
          <Descriptions.Item label="Brand">{campaign.brandTitle}</Descriptions.Item>
          <Descriptions.Item label="Cities">
            {campaign.cities}
          </Descriptions.Item>
          <Descriptions.Item label="Start Time">
            {campaign.from}
          </Descriptions.Item>
          <Descriptions.Item label="Effective Time">
            {campaign.to}
          </Descriptions.Item>
          <Descriptions.Item label="Duration">
            {campaign.duration} days
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      
    </div>
  );
}

export default CampaignHeader;

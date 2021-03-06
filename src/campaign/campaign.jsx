import React, { useEffect, useState } from "react";
import { Typography, Table, Row, Col, message, Avatar } from "antd";
import { PlusOutlined, LinkOutlined } from "@ant-design/icons";
import Delete from "../common/Delete";
import { deleteCampaign, getCampaignes } from "../services/campaignService";
import UpsertCampaign from "./UpsertCampaign";
import moment from "moment";
import { urlHelper } from "../utils/UrlHelper";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

function Campaign() {
  const history = useHistory();
  const [state, setState] = useState({
    data: [],
    loading: true,
    deleting: false,
    selected: null,
  });
  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    getCampaignes()
      .then((data) => {
        setState((prev) => ({ ...prev, data: data.data, loading: false }));
      })
      .catch((e) => {
        setState((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  const handleRemove = (campaign) => {
    setState((prev) => ({ ...prev, deleting: true, selected: campaign._id }));
    deleteCampaign(campaign._id)
      .then((data) => {
        message.success(`Campaign ${campaign.title} deleted successfully!`);
        setState((prev) => ({
          ...prev,
          deleting: false,
          selected: null,
          data: prev.data.filter((item) => item._id !== campaign._id),
        }));
      })
      .catch((e) => {
        message.error(`Error while deleting ${campaign.title}`);
        setState((prev) => ({ ...prev, deleting: false, selected: null }));
      });
  };

  const handleCreate = (campaign) => {
    setState((prev) => ({ ...prev, data: [...prev.data, campaign] }));
  };

  const handleUpdate = (campaign) => {
    setState((prev) => {
      const newData = [...prev.data];
      const index = newData.findIndex((item) => item._id === campaign._id);
      newData[index] = campaign;
      return {
        ...prev,
        data: newData,
      };
    });
  };

  const handleDetails = (id) => {
    history.push({ pathname: "/campaign_detail", state: { campaign: id } });
  };

  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: 360 }}
    >
      <Row justify="space-between">
        <Col flex={0}>
          <Title level={2}>Campaigns</Title>
        </Col>
        <Col flex={0}>
          <UpsertCampaign onCreate={handleCreate} initValues={null}>
            <PlusOutlined /> Add New
          </UpsertCampaign>
        </Col>
      </Row>
      <Table
        columns={[
          {
            title: "Campaign",
            dataIndex: "title",
            key: "title",
            render: (text, record) => {
              return (
                <div>
                  <Avatar src={urlHelper.fileUrl(record.brand.img)} />{" "}
                  {record.title}
                </div>
              );
            },
          },
          {
            title: "From",
            dataIndex: "from",
            key: "from",
            render: (text) => {
              return moment(text).format("DD:MM:YYYY");
            },
          },
          {
            title: "To",
            dataIndex: "to",
            key: "to",
            render: (text) => {
              return moment(text).format("DD:MM:YYYY");
            },
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
          },
          {
            title: "Action",
            key: "action",
            align: "right",
            render: (text, record) => {
              return (
                <>
                  {/* <Delete
                                onDelete={() => handleRemove(record)}
                                deleting={state.deleting && record._id === state.selected}
                            />
                            &nbsp;|&nbsp; */}
                  <UpsertCampaign initValues={record} onCreate={handleUpdate}>
                    Edit
                  </UpsertCampaign>
                  &nbsp;|&nbsp;
                  <a onClick={() => handleDetails(record._id)}>Details</a>
                </>
              );
            },
          },
        ]}
        loading={state.loading}
        dataSource={state.data}
      />
    </div>
  );
}

export default Campaign;

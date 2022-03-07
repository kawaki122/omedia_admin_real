import React from "react";
import {
  Modal,
  Typography,
  Tabs,
  Descriptions,
  Tag,
  Button,
  Image,
  Empty,
} from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Reviews from "./Reviews";
const { Text } = Typography;
const { TabPane } = Tabs;
const { Item } = Descriptions;
const { PreviewGroup } = Image;

function LocationDetail({ location, visible, viewLocation, reviews, submitReview }) {
  if (!visible) {
    return null;
  }
  return (
    <Modal
      visible={visible}
      onCancel={() => viewLocation(-1)}
      width={800}
      footer={[
        <Button
          key="back"
          icon={<EditOutlined />}
          onClick={() => viewLocation(-1)}
        >
          Edit
        </Button>,
        <Button
          key="submit"
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => viewLocation(-1)}
        >
          Delete
        </Button>,
      ]}
    >
      {location.longitude !== "Not Added" && (
        <iframe
          height="360"
          style={{ border: "0px", width: "100%" }}
          loading="lazy"
          allowfullscreen
          src={`https://maps.google.com/maps?q=${location.longitude},${location.latitude}&hl=es;z=14&amp;output=embed`}
        ></iframe>
      )}
      {location.longitude === "Not Added" && (
        <div
          style={{
            height: "360px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Location not added</h2>
        </div>
      )}
      <h1 style={{ marginBottom: "5px" }}>{location.title}</h1>
      <Text type="secondary">{location.address}</Text>
      <br />
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="Basic" key="1">
          <Descriptions size="small" column={3}>
            <Item label="Status">
              <Tag color="blue">{location.status}</Tag>
            </Item>
            <Item label="Size">{location.size}</Item>
            <Item label="Trafic flow">{location.tflow}</Item>
            <Item label="Last updated">
              {moment(location.updatedAt).format("MMMM Do YYYY")}
            </Item>
          </Descriptions>
        </TabPane>
        <TabPane tab="Photos" key="2">
          <PreviewGroup>
            {location.photos.map((photo) => (
              <Image width={200} height={200} src={photo} />
            ))}
          </PreviewGroup>
          {location.photos.length === 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </TabPane>
        <TabPane tab="Reviews" key="3">
          <Reviews reviews={reviews} submitReview={submitReview} />
        </TabPane>
      </Tabs>
    </Modal>
  );
}

export default LocationDetail;

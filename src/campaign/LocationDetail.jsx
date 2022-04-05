import React from "react";
import {
  Modal,
  Typography,
  Tabs,
  Descriptions,
  Tag,
  Button,
  Empty,
  Popconfirm,
  Upload,
  Input,
  Select,
  Image,
  Space,
  Row,
  Col,
} from "antd";
import ImgCrop from "antd-img-crop";
import moment from "moment";
import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import Reviews from "./Reviews";
import { urlHelper } from "../utils/UrlHelper";
import { locationEnum } from "../utils/constants";
const { Text } = Typography;
const { TabPane } = Tabs;
const { Item } = Descriptions;

function LocationDetail({ state }) {
  const location = state.location;
  const visible = Boolean(location);
  if (!visible) {
    return null;
  }

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const renderData = (data) => (data ? data : "Not Added");

  return (
    <Modal
      visible={visible}
      onCancel={() => state.viewLocation(null)}
      width={800}
      style={{ top: 20 }}
      footer={
        state.edit
          ? [
              <Popconfirm
                title={`${
                  state.deletables.length
                    ? "Empty reviews will be deleted. "
                    : ""
                }Are you sure to save the changes?`}
                onConfirm={() => state.updateLocation()}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  key="save"
                  loading={state.updating}
                  icon={<EditOutlined />}
                >
                  Save
                </Button>
              </Popconfirm>,
              <Button
                key="discard"
                type="danger"
                icon={<CloseOutlined />}
                onClick={() => state.toggleEdit(false)}
              >
                Cancel
              </Button>,
            ]
          : [
              <Button
                key="edit"
                icon={<EditOutlined />}
                onClick={() => state.toggleEdit(true)}
              >
                Edit
              </Button>,
              <Button
                key="delete"
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => state.viewLocation(null)}
              >
                Delete
              </Button>,
            ]
      }
    >
      {location.longitude ? (
        <iframe
          height="360"
          style={{ border: "0px", width: "100%" }}
          loading="lazy"
          allowfullscreen
          src={`https://maps.google.com/maps?q=${location.longitude},${location.latitude}&hl=es;z=14&amp;output=embed`}
        ></iframe>
      ) : (
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
      {state.edit ? (
        <Input
          name="title"
          value={location.title}
          onChange={state.setLocationDetail}
        />
      ) : (
        <h1 style={{ marginBottom: "5px" }}>{location.title}</h1>
      )}
      {state.edit ? (
        <Input
          name="address"
          value={location.address}
          onChange={state.setLocationDetail}
        />
      ) : (
        <Text type="secondary">{renderData(location.address)}</Text>
      )}
      <br />
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="Basic" key="1">
          <Descriptions size="small" column={3}>
            <Item label="Status">
              {state.edit ? (
                <Select
                  value={location.status}
                  onChange={(e) =>
                    state.setLocationDetail({
                      target: { name: "status", value: e },
                    })
                  }
                >
                  <Select.Option value={locationEnum.PENDING}>
                    {locationEnum.PENDING}
                  </Select.Option>
                  <Select.Option value={locationEnum.ACTIVE}>
                    {locationEnum.ACTIVE}
                  </Select.Option>
                  <Select.Option value={locationEnum.DISCARDED}>
                    {locationEnum.DISCARDED}
                  </Select.Option>
                </Select>
              ) : (
                <Tag color="blue">{location.status}</Tag>
              )}
            </Item>
            <Item label="Size">
              {state.edit ? (
                <Input
                  name="size"
                  value={location.size}
                  onChange={state.setLocationDetail}
                />
              ) : (
                renderData(location.size)
              )}
            </Item>
            <Item label="Trafic flow">
              {state.edit ? (
                <Input
                  name="tflow"
                  value={location.tflow}
                  onChange={state.setLocationDetail}
                />
              ) : (
                renderData(location.tflow)
              )}
            </Item>
            <Item label="Last updated">
              {moment(location.updatedAt).format("MMMM Do YYYY")}
            </Item>
          </Descriptions>
        </TabPane>
        <TabPane tab="Photos" key="2">
          <div>
            {state.edit ? (
              // <ImgCrop rotate>
              <Upload
                action={urlHelper.uploadUrl}
                name="file"
                listType="picture-card"
                fileList={location?.photos.map((item, i) => ({
                  uid: i,
                  name: item,
                  status: "done",
                  url: urlHelper.fileUrl(item),
                }))}
                onPreview={onPreview}
                onRemove={state.removePhoto}
                customRequest={state.uploadLocationPic}
              >
                {location?.photos.length < 5 && "+ Upload"}
              </Upload>
            ) : (
              <Row>
                {location?.photos.map((item, i) => (
                  <Col span={7}>
                    <Image
                      key={i}
                      width={200}
                      height={200}
                      src={urlHelper.fileUrl(item)}
                    />
                  </Col>
                ))}
              </Row>
            )}
            {location.photos.length === 0 && !state.edit && (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="3">
          <Reviews
            reviews={state.locationReviews}
            submitReview={state.submitReview}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
}

export default LocationDetail;

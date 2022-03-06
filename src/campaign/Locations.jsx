import { Select, Card, Carousel, Input } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { locationEnum } from "../utils/constants";
import UpsertLocation from "./UpsertLocation";

const { Option } = Select;
const {Search} = Input;

function Locations({
  onTypeChange,
  locationType,
  onCreate,
  inputChange,
  locations,
  viewLocation,
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 15px",
          marginTop: '50px',
        }}
      >
        <Select value={locationType} size="large" onChange={onTypeChange}>
          <Option value={locationEnum.ACTIVE}>Active Locations</Option>
          <Option value={locationEnum.PENDING}>Pending Locations</Option>
        </Select>
        <div style={{ display: "flex" }}>
          <Search placeholder="search locations" size="large" onSearch={inputChange} style={{ width: 200, marginRight: '20px' }} />
          <UpsertLocation
            initValues={{
              title: "",
              address: "",
              _id: null,
            }}
            onCreate={onCreate}
          >
            Add New
          </UpsertLocation>
        </div>
      </div>
      <Carousel slidesToShow={5}>
        {locations.map((location, key) => (
          <div key={key}>
            {location && (
              <Card
                hoverable
                style={{ margin: "15px 15px" }}
                cover={
                  <img
                    style={{ width: "100%", height: "200px" }}
                    src="/logo192.png"
                  />
                }
                onClick={()=>viewLocation(key)}
                actions={[
                  <DeleteOutlined key="delete" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta title={location.title} description={location.address} />
              </Card>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Locations;

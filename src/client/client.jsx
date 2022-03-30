import React, { useEffect, useState } from "react";
import { Table, Avatar, message, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { deleteClient } from "../services/brandService";
import { urlHelper } from "../utils/UrlHelper";
import Delete from "../common/Delete";
import UpsertClient from "./UpsertClient";
import { loadClients } from "../store/actions/dashActions";
import { useDispatch, useSelector } from "react-redux";
import { setClientsSuccess } from "../store/reducers/dashSlice";
import { getHttpErrorMessage } from "../utils/constants";

function Client() {
  const dispatch = useDispatch();
  const clientInfo = useSelector((state) => state.dashboard.client);
  const [state, setState] = useState({
    deleting: false,
    selected: null,
  });

  // useEffect(() => {
  //     if(!clientInfo.data.length){
  //         dispatch(loadClients())
  //     }
  // }, [])

  const handleRemove = (client) => {
    setState((prev) => ({ ...prev, deleting: true, selected: client._id }));
    deleteClient(client._id)
      .then((data) => {
        message.success(`Client ${client.name} deleted successfully!`);
        dispatch(
          setClientsSuccess(
            clientInfo.data.filter((item) => item._id !== client._id)
          )
        );
        setState((prev) => ({
          ...prev,
          deleting: false,
          selected: null,
        }));
      })
      .catch((e) => {
        console.log(e.response);
        message.error(
          getHttpErrorMessage(e, `Error while deleting ${client.name}`)
        );
        setState((prev) => ({ ...prev, deleting: false, selected: null }));
      });
  };

  const handleCreate = (client) => {
    dispatch(setClientsSuccess([...clientInfo.data, client]));
  };

  const handleUpdate = (client) => {
    const newData = [...clientInfo.data];
    const index = newData.findIndex((item) => item._id === client._id);
    newData[index] = client;
    dispatch(setClientsSuccess(newData));
  };

  return (
    <Card
      title="Clients"
      style={{ minHeight: "355px" }}
      extra={
        <UpsertClient onCreate={handleCreate} initValues={null}>
          <PlusOutlined /> Add New
        </UpsertClient>
      }
    >
      <Table
        columns={[
          {
            title: "Client",
            dataIndex: "name",
            key: "name",
            render: (url, record) => (
              <div>
                <Avatar src={urlHelper.fileUrl(record.img)} /> {record.name}
              </div>
            ),
          },
          {
            title: "Action",
            key: "action",
            align: "right",
            render: (text, record) => {
              return (
                <>
                  <Delete
                    onDelete={() => handleRemove(record)}
                    deleting={state.deleting && record._id === state.selected}
                  />
                  &nbsp;|&nbsp;
                  <UpsertClient initValues={record} onCreate={handleUpdate}>
                    Edit
                  </UpsertClient>
                </>
              );
            },
          },
        ]}
        loading={clientInfo.loading}
        dataSource={clientInfo.data}
      />
    </Card>
  );
}

export default Client;

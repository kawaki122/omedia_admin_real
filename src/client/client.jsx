import React, { useEffect, useState } from 'react';
import { Typography, Table, Avatar, Row, Col, message, Spin, Popconfirm } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import { deleteClient, getBrands, getClients } from '../services/brandService';
import { urlHelper } from '../utils/UrlHelper';
import Delete from '../common/Delete';
import UpsertClient from './UpsertClient';

const { Title } = Typography;

function Client() {
    const [state, setState] = useState({
        data: [],
        loading: true,
        deleting: false,
        selected: null,
    })
    useEffect(() => {
        setState(prev => ({ ...prev, loading: true }))
        getClients().then(data => {
            setState(prev => ({ ...prev, data: data.data, loading: false }))
        }).catch(e => {
            setState(prev => ({ ...prev, loading: false }))
        })
    }, [])

    const handleRemove = (client) => {
        setState(prev => ({ ...prev, deleting: true, selected: client._id }))
        deleteClient(client._id).then(data => {
            message.success(`Client ${client.name} deleted successfully!`);
            setState(prev => ({
                ...prev, deleting: false,
                selected: null,
                data: prev.data.filter(item => item._id !== client._id)
            }))
        }).catch(e => {
            message.error(`Error while deleting ${client.name}`);
            setState(prev => ({ ...prev, deleting: false, selected: null }))
        })
    }

    const handleCreate = (client) => {
        setState(prev => ({ ...prev, data: [...prev.data, client] }))
    }

    const handleUpdate = (client) => {
        setState(prev => {
            const newData = [...prev.data]
            const index = newData.findIndex(item => item._id === client._id)
            newData[index] = client;
            return {
                ...prev,
                data: newData,
            }
        })
    }

    return (
        <div>
            <Row justify="space-between">
                <Col flex={0}>
                    <Title level={2}>Clients</Title>
                </Col>
                <Col flex={0}>
                    <UpsertClient onCreate={handleCreate} initValues={null}>
                        <PlusOutlined /> Add New
                    </UpsertClient>
                </Col>
            </Row>
            <Table columns={[
                {
                    title: 'Client',
                    dataIndex: 'name',
                    key: 'name',
                    render: (url, record) => <div><Avatar src={urlHelper.fileUrl(record.img)} /> {record.name}</div>
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => {
                        return <>
                            <Delete
                                onDelete={() => handleRemove(record)}
                                deleting={state.deleting && record._id === state.selected}
                            />
                            |
                            <UpsertClient initValues={record} onCreate={handleUpdate}>
                                Edit
                            </UpsertClient>
                        </>
                    },
                },
            ]} loading={state.loading} dataSource={state.data} />
        </div>
    );
}

export default Client;

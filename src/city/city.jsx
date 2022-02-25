import React, { useEffect, useState } from 'react';
import { Typography, Table, Row, Col, message } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import Delete from '../common/Delete';
import { deleteCity, getCities } from '../services/cityService';
import UpsertCity from './UpsertCity';

const { Title } = Typography;

function City() {
    const [state, setState] = useState({
        data: [],
        loading: true,
        deleting: false,
        selected: null,
    })
    useEffect(() => {
        setState(prev => ({ ...prev, loading: true }))
        getCities().then(data => {
            setState(prev => ({ ...prev, data: data.data, loading: false }))
        }).catch(e => {
            setState(prev => ({ ...prev, loading: false }))
        })
    }, [])

    const handleRemove = (city) => {
        setState(prev => ({ ...prev, deleting: true, selected: city._id }))
        deleteCity(city._id).then(data => {
            message.success(`City ${city.title} deleted successfully!`);
            setState(prev => ({
                ...prev, deleting: false,
                selected: null,
                data: prev.data.filter(item => item._id !== city._id)
            }))
        }).catch(e => {
            message.error(`Error while deleting ${city.title}`);
            setState(prev => ({ ...prev, deleting: false, selected: null }))
        })
    }

    const handleCreate = (city) => {
        setState(prev => ({ ...prev, data: [...prev.data, city] }))
    }

    const handleUpdate = (city) => {
        setState(prev => {
            const newData = [...prev.data]
            const index = newData.findIndex(item => item._id === city._id)
            newData[index] = city;
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
                    <Title level={2}>Cities</Title>
                </Col>
                <Col flex={0}>
                    <UpsertCity onCreate={handleCreate} initValues={null}>
                        <PlusOutlined /> Add New
                    </UpsertCity>
                </Col>
            </Row>
            <Table columns={[
                {
                    title: 'City',
                    dataIndex: 'title',
                    key: 'title',
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
                            <UpsertCity initValues={record} onCreate={handleUpdate}>
                                Edit
                            </UpsertCity>
                        </>
                    },
                },
            ]} loading={state.loading} dataSource={state.data} />
        </div>
    );
}

export default City;

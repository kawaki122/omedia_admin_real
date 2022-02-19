import React, { useEffect, useState } from 'react';
import { Typography, Table, Avatar, Row, Col, message, Spin, Popconfirm } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import UpsertBrand from './UpsertBrand';
import { deleteBrand, getBrands } from '../services/brandService';
import { urlHelper } from '../utils/UrlHelper';
import Delete from '../common/Delete';

const { Title } = Typography;

function Brand() {
    const [state, setState] = useState({
        data: [],
        loading: true,
        deleting: false,
        selected: null,
    })
    useEffect(() => {
        setState(prev => ({ ...prev, loading: true }))
        getBrands().then(data => {
            console.log(data)
            setState(prev => ({ ...prev, data: data.data, loading: false }))
        }).catch(e => {
            setState(prev => ({ ...prev, loading: false }))
            console.log(e)
        })
    }, [])

    const handleRemove = (brand) => {
        setState(prev => ({ ...prev, deleting: true, selected: brand._id }))
        deleteBrand(brand._id).then(data => {
            message.success(`Brand ${brand.brand} deleted successfully!`);
            setState(prev => ({
                ...prev, deleting: false,
                selected: null,
                data: prev.data.filter(item => item._id !== brand._id)
            }))
        }).catch(e => {
            message.error(`Error while deleting ${brand.brand}`);
            setState(prev => ({ ...prev, deleting: false, selected: null }))
        })
    }

    const handleCreate = (brand) => {
        setState(prev => ({ ...prev, data: [...prev.data, brand] }))
    }

    return (
        <div>
            <Row justify="space-between">
                <Col flex={0}>
                    <Title level={2}>Brands</Title>
                </Col>
                <Col flex={0}>
                    <UpsertBrand onCreate={handleCreate} initValues={null}>
                        <PlusOutlined /> Add New
                    </UpsertBrand>
                </Col>
            </Row>
            <Table columns={[
                {
                    title: 'Brand',
                    dataIndex: 'title',
                    key: 'title',
                    render: (url, record) => <div><Avatar src={urlHelper.fileUrl(record.img)} /> {record.title}</div>
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
                            <UpsertBrand initValues={record} onCreate={() => { }}>
                                Edit
                            </UpsertBrand>
                        </>
                    },
                },
            ]} loading={state.loading} dataSource={state.data} />
        </div>
    );
}

export default Brand;

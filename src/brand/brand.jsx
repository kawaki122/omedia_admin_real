import React, { useEffect, useState } from 'react';
import { Typography, Table, Avatar, Row, Col, message, Spin } from 'antd';
import AddBrand from './AddBrand';
import { getBrands, removeBrand } from '../services/firebase_service';

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
            setState(prev => ({ ...prev, data, loading: false }))
        }).catch(e => {
            setState(prev => ({ ...prev, loading: false }))
            console.log(e)
        })
    }, [])

    const handleRemove = (brand) => {
        setState(prev => ({ ...prev, deleting: true, selected: brand.id }))
        removeBrand(brand.id).then(data => {
            message.success(`Brand ${brand.brand} deleted successfully!`);
            setState(prev => ({
                ...prev, deleting: false,
                selected: null, 
                data: prev.data.filter(item => item.id !== brand.id) 
            }))
        }).catch(e => {
            message.error(`Error while deleting ${brand.brand}`);
            setState(prev => ({ ...prev, deleting: false, selected: null }))
        })
    }

    return (
        <div>
            <Row justify="space-between">
                <Col flex={0}>
                    <Title level={2}>Brands</Title>
                </Col>
                <Col flex={0}>
                    <AddBrand />
                </Col>
            </Row>
            <Table columns={[
                {
                    title: 'Brand',
                    dataIndex: 'brand',
                    key: 'brand',
                    render: (url, record) => <div><Avatar src={record.logo} /> {record.brand}</div>
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => {
                        if (state.deleting && record.id === state.selected) {
                            return <Spin size="small" />
                        }
                        return <a onClick={() => handleRemove(record)}>Delete</a>
                    },
                },
            ]} loading={state.loading} dataSource={state.data} />
        </div>
    );
}

export default Brand;

import React, { useEffect, useState } from 'react';
import { Typography, Table, Avatar, Row, Col, message, Spin, Popconfirm, Card } from 'antd';
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
            setState(prev => ({ ...prev, data: data.data, loading: false }))
        }).catch(e => {
            setState(prev => ({ ...prev, loading: false }))
        })
    }, [])

    const handleRemove = (brand) => {
        setState(prev => ({ ...prev, deleting: true, selected: brand._id }))
        deleteBrand(brand._id).then(data => {
            message.success(`Brand ${brand.title} deleted successfully!`);
            setState(prev => ({
                ...prev, deleting: false,
                selected: null,
                data: prev.data.filter(item => item._id !== brand._id)
            }))
        }).catch(e => {
            message.error(`Error while deleting ${brand.title}`);
            setState(prev => ({ ...prev, deleting: false, selected: null }))
        })
    }

    const handleCreate = (brand) => {
        setState(prev => ({ ...prev, data: [...prev.data, brand] }))
    }

    const handleUpdate = (brand) => {
        setState(prev => {
            const newData = [...prev.data]
            const index = newData.findIndex(item => item._id === brand._id)
            newData[index] = brand;
            return {
                ...prev,
                data: newData,
            }
        })
    }

    return (
        <Card title="Brands" extra={<UpsertBrand onCreate={handleCreate} initValues={null}>
            <PlusOutlined /> Add New
        </UpsertBrand>}>
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
                    align: 'right',
                    render: (text, record) => {
                        return <>
                            <Delete
                                onDelete={() => handleRemove(record)}
                                deleting={state.deleting && record._id === state.selected}
                            />
                            &nbsp;|&nbsp;
                            <UpsertBrand initValues={record} onCreate={handleUpdate}>
                                Edit
                            </UpsertBrand>
                        </>
                    },
                },
            ]} loading={state.loading} dataSource={state.data} />
        </Card>
    );
}

export default Brand;

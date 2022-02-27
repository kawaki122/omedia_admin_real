import React, { useEffect, useState } from 'react';
import { Table, Avatar, message, Card } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import UpsertBrand from './UpsertBrand';
import { deleteBrand } from '../services/brandService';
import { urlHelper } from '../utils/UrlHelper';
import Delete from '../common/Delete';
import { loadBrands } from '../store/actions/dashActions';
import { useDispatch, useSelector } from 'react-redux';
import { setBrandsSuccess } from '../store/reducers/dashSlice';


function Brand() {
    const dispatch = useDispatch()
    const brandInfo = useSelector(state => state.dashboard.brand)
    const [state, setState] = useState({
        deleting: false,
        selected: null,
    })
    useEffect(() => {
        if(!brandInfo.data.length){
            dispatch(loadBrands())
        }
    }, [])

    const handleRemove = (brand) => {
        setState(prev => ({ ...prev, deleting: true, selected: brand._id }))
        deleteBrand(brand._id).then(data => {
            message.success(`Brand ${brand.title} deleted successfully!`);
            dispatch(setBrandsSuccess(brandInfo.data.filter(item => item._id !== brand._id)))
            setState(prev => ({
                ...prev, deleting: false,
                selected: null,
            }))
        }).catch(e => {
            message.error(`Error while deleting ${brand.title}`);
            setState(prev => ({ ...prev, deleting: false, selected: null }))
        })
    }

    const handleCreate = (brand) => {
        dispatch(setBrandsSuccess([...brandInfo.data, brand]))
    }

    const handleUpdate = (brand) => {
        const newData = [...brandInfo.data]
        const index = newData.findIndex(item => item._id === brand._id)
        newData[index] = brand;
        dispatch(setBrandsSuccess(newData))
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
            ]} loading={brandInfo.loading} dataSource={brandInfo.data} />
        </Card>
    );
}

export default Brand;

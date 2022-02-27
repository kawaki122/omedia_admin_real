import React, { useEffect, useState } from 'react';
import { Table, message, Card } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import Delete from '../common/Delete';
import { deleteCity, getCities } from '../services/cityService';
import UpsertCity from './UpsertCity';
import { useDispatch } from 'react-redux';
import { loadCities } from '../store/actions/dashActions';
import { useSelector } from 'react-redux';
import { setCitiesSuccess } from '../store/reducers/dashSlice';

function City() {
    const dispatch = useDispatch()
    const cityInfo = useSelector(state => state.dashboard.city)
    const [state, setState] = useState({
        deleting: false,
        selected: null,
    })

    useEffect(() => {
        if(!cityInfo.data.length) {
            dispatch(loadCities())
        }
    }, [])

    const handleRemove = (city) => {
        setState(prev => ({ ...prev, deleting: true, selected: city._id }))
        deleteCity(city._id).then(data => {
            message.success(`City ${city.title} deleted successfully!`);
            dispatch(setCitiesSuccess(cityInfo.data.filter(item => item._id !== city._id)))
            setState(prev => ({
                ...prev, deleting: false,
                selected: null,
            }))
        }).catch(e => {
            message.error(`Error while deleting ${city.title}`);
            setState(prev => ({ ...prev, deleting: false, selected: null }))
        })
    }

    const handleCreate = (city) => {
        dispatch(setCitiesSuccess([...cityInfo.data, city]))
    }

    const handleUpdate = (city) => {
        const newData = [...cityInfo.data]
        const index = newData.findIndex(item => item._id === city._id)
        newData[index] = city;
        dispatch(setCitiesSuccess(newData))
    }

    return (
        <Card title="Cities" extra={<UpsertCity onCreate={handleCreate} initValues={null}>
            <PlusOutlined /> Add New
        </UpsertCity>}>

            <Table columns={[
                {
                    title: 'City',
                    dataIndex: 'title',
                    key: 'title',
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
                            <UpsertCity initValues={record} onCreate={handleUpdate}>
                                Edit
                            </UpsertCity>
                        </>
                    },
                },
            ]} loading={cityInfo.loading} dataSource={cityInfo.data} />
        </Card>
    );
}

export default City;

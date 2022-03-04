import { Button, Select } from 'antd';
import React from 'react';
import { locationEnum } from '../utils/constants';
import SearchLocation from './SearchLocation';
import UpsertLocation from './UpsertLocation';

const { Option } = Select;

function LocationHeader({ onTypeChange, locationType, onCreate, inputChange }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 15px' }}>
            <Select value={locationType} onChange={onTypeChange}>
                <Option value={locationEnum.ACTIVE}>Active Locations</Option>
                <Option value={locationEnum.PENDING}>Pending Locations</Option>
            </Select>
            <div style={{ display: 'flex' }}>
                <SearchLocation inputChange={inputChange} />
                <UpsertLocation initValues={{
                    title: '',
                    address: '',
                    _id: null,
                }} onCreate={onCreate}>Add New</UpsertLocation>
            </div>
        </div>
    )
}

export default LocationHeader;
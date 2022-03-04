import { Button } from 'antd';
import React, { useState } from 'react';
import {
    PlusOutlined,
} from '@ant-design/icons';

function SearchLocation({inputChange}) {

    return (
        <div style={{
            background: 'white',
            padding: '5px 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'solid 1px #d9d9d9',
            borderRadius: '20px',
            marginRight: '15px'
            }}>
            <PlusOutlined />
            <input style={{border: 'none'}} onChange={inputChange} />
        </div>
    )
}

export default SearchLocation;
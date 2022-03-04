import { Col, Row, Card } from 'antd';
import React from 'react';
import Brand from '../brand/brand';
import City from '../city/city';
import Client from '../client/client';
import { dashboard_card } from './dashboard.style';

export function Dashboard() {
    return (<div style={{ padding: 24, minHeight: 360 }}>
        <Row justify='space-between'>
            <Col span={8} style={dashboard_card}>
                <City />
            </Col>
            <Col span={8} style={dashboard_card}>
                <Brand />
            </Col>
            <Col span={8} style={dashboard_card}>
                <Client />
            </Col>
        </Row>
    </div>)
}
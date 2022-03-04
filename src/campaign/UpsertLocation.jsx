import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Input, message, Select } from 'antd';
import { upsertLocation } from '../services/campaignService';
import {
    PlusOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Option } = Select
function UpsertLocation({ onCreate, initValues, children }) {
    const [form] = Form.useForm()
    const history = useHistory()
    const [state, setState] = useState({
        visible: false,
        confirming: false,
    });

    const showModal = () => {
        form.setFieldsValue({
            title: initValues.title,
            address: initValues.address,
            campaign: history.location.state.campaign,
            locationId: initValues._id,
        });

        setState(prev => ({ ...prev, visible: true }))
    };

    const handleOk = (values) => {
        setState(prev => ({ ...prev, confirming: true }));

        upsertLocation({
            title: values.title,
            address: values.address,
            locationId: values.locationId,
            campaign: values.campaign,
        }).then(data => {
            message.success(`Location ${values.title} ${state.locationId ? 'updated' : 'added'} successfully`);
            onCreate(data.data)
            form.resetFields()
            setState(prev => ({ ...prev, confirming: false, visible: false }));
        }).catch(e => {
            console.log(e)
            message.error("Error while adding location");
            setState(prev => ({ ...prev, confirming: false }));
        })
    };

    const handleCancel = () => {
        form.resetFields()
        setState(prev => ({ ...prev, visible: false }));
    };

    return (
        <>
            <Button onClick={showModal} size='large' shape='round' icon={<PlusOutlined />}>{children}</Button>
            <Modal
                title="Add Location"
                visible={state.visible}
                onCancel={handleCancel}
                footer={null}
                style={{ maxWidth: "500px" }}
            >
                <Form
                    name="basic"
                    onFinish={handleOk}
                    autoComplete="off"
                    layout='vertical'
                    form={form}
                >
                    <Form.Item
                        label="Location title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Location title!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Complete address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the location address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        hidden={true}
                        name="campaign"
                    />
                    <Form.Item
                        hidden={true}
                        name="locationId"
                    />

                    <Form.Item
                        style={{ width: "100%", marginTop: "20px" }}
                    >
                        <Button type="primary" htmlType="submit" loading={state.confirming} style={{ width: "100%" }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default UpsertLocation;
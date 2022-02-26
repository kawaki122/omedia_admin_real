import React, { useState } from 'react';
import { Button, Form, Modal, Input, message } from 'antd';
import { upsertCampaign } from '../services/campaignService';

function UpsertCampaign({ onCreate, initValues, children}) {
    const [form] = Form.useForm()
    const [state, setState] = useState({
        visible: false,
        confirming: false,
        campaignId: '',
    });

    const showModal = () => {
        if(initValues) {
            form.setFieldsValue({title: initValues.title});
        }
        setState(prev => ({
            ...prev,
            visible: true,
            ...(initValues && {campaignId: initValues._id})
        }));
    };

    const handleOk = (values) => {
        setState(prev => ({ ...prev, confirming: true }));
        upsertCampaign({
            title: values.title,
            campaignd: state.campaignId,
        }).then(data => {
            message.success(`Campaign ${values.title} ${state.campaignId?'updated':'added'} successfully`);
            onCreate(data.data)
            form.resetFields()
            setState(prev => ({ ...prev, confirming: false, visible: false }));
        }).catch(e => {
            console.log(e)
            message.error("Error while adding campaign");
            setState(prev => ({ ...prev, confirming: false }));
        })
    };

    const handleCancel = () => {
        form.resetFields()
        setState(prev => ({ ...prev, visible: false }));
    };


    return (
        <>
            <Button type="primary" onClick={showModal}>{children}</Button>
            <Modal
                title="Add Campaign"
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
                        label="Campaign name"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the campaign name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

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

export default UpsertCampaign;
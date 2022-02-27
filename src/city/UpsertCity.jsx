import React, { useState } from 'react';
import { Button, Form, Modal, Input, message } from 'antd';
import { upsertCity } from '../services/cityService';

function UpsertCity({ onCreate, initValues, children}) {
    const [form] = Form.useForm()
    const [state, setState] = useState({
        visible: false,
        confirming: false,
        cityId: '',
    });

    const showModal = () => {
        if(initValues) {
            form.setFieldsValue({title: initValues.title});
        }
        setState(prev => ({
            ...prev,
            visible: true,
            ...(initValues && {cityId: initValues._id})
        }));
    };

    const handleOk = (values) => {
        setState(prev => ({ ...prev, confirming: true }));
        upsertCity({
            title: values.title,
            cityId: state.cityId,
        }).then(data => {
            message.success(`City ${values.title} ${state.cityId?'updated':'added'} successfully`);
            onCreate(data.data)
            form.resetFields()
            setState(prev => ({ ...prev, confirming: false, visible: false }));
        }).catch(e => {
            console.log(e)
            message.error("Error while adding city");
            setState(prev => ({ ...prev, confirming: false }));
        })
    };

    const handleCancel = () => {
        form.resetFields()
        setState(prev => ({ ...prev, visible: false }));
    };


    return (
        <>
            <a type="primary" onClick={showModal}>{children}</a>
            <Modal
                title="Add City"
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
                        label="City name"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the city name!',
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

export default UpsertCity;
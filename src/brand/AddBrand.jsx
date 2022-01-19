import React, { useState } from 'react';
import { Button, Form, Modal, Input, Upload, message } from 'antd';
import {
    PlusOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { addBrand } from '../services/firebase_service';

function AddBrand() {
    const [state, setState] = useState({
        visible: false,
        confirming: false,
    });

    const showModal = () => {
        setState(prev=>({...prev, visible: true}));
    };

    const handleOk = (values) => {
        setState(prev=>({...prev, confirming: true}));
        addBrand(values).then(data => {
            message.success(`Brand ${values.brand} added successfully`);
            setState(prev=>({...prev, confirming: false}));
        }).catch(e => {
            console.log(e)
            message.error("Error while adding brand");
            setState(prev=>({...prev, confirming: false}));
        })
    };

    const handleCancel = () => {
        setState(prev=>({...prev, visible: false}));
    };

    const getFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <>
            <Button type="primary" onClick={showModal}><PlusOutlined /> Add New</Button>
            <Modal
                title="Add Brand"
                visible={state.visible}
                onCancel={handleCancel}
                footer={null}
                style={{ maxWidth: "500px" }}
            >
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleOk}
                    onFinishFailed={() => { }}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Brand name"
                        name="brand"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the brand name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Brand Logo"
                        name="logo"
                        rules={[
                            {
                                required: true,
                                message: 'Please input brand logo!',
                            },
                        ]}
                        getValueFromEvent={getFile}
                    >
                        <Upload>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
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

export default AddBrand;
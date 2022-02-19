import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Input, Upload, message } from 'antd';
import {
    PlusOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import { addBrand } from '../services/brandService';
import { getBase64 } from '../utils/constants';
import { urlHelper } from '../utils/UrlHelper';

function UpsertBrand({ onCreate, initValues, children}) {
    const [form] = Form.useForm()
    const [state, setState] = useState({
        visible: false,
        confirming: false,
        imgUrl: '',
        loading: false,
    });

    const showModal = () => {
        if(initValues) {
            form.setFieldsValue({title: initValues.title});
        }
        setState(prev => ({ ...prev, visible: true, imgUrl: initValues?initValues.img:'' }));
    };

    const handleOk = (values) => {
        setState(prev => ({ ...prev, confirming: true }));
        addBrand({ title: values.title, img: state.imgUrl }).then(data => {
            message.success(`Brand ${values.brand} added successfully`);
            onCreate(data.data)
            form.resetFields()
            setState(prev => ({ ...prev, confirming: false, visible: false, imgUrl: '' }));
        }).catch(e => {
            console.log(e)
            message.error("Error while adding brand");
            setState(prev => ({ ...prev, confirming: false }));
        })
    };

    const handleCancel = () => {
        form.resetFields()
        setState(prev => ({ ...prev, visible: false, imgUrl: '' }));
    };

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setState(p => ({ ...p, loading: true }));
            return;
        }
        if (info.file.status === 'done') {
            setState(prev => ({ ...prev, imgUrl: info.file.response, loading: false }))
            /*getBase64(info.file.originFileObj, imageUrl =>
              setState(prev => ({...prev, imageUrl, loading: false})),
            );*/
        }
        if (info.file.status === 'error') {
            setState(prev => ({ ...prev, loading: false }))
            message.error('Oops upload failed please try again!')
        }
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const getFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const uploadButton = (
        <div>
            {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    
    return (
        <>
            <Button type="primary" onClick={showModal}>{children}</Button>
            <Modal
                title="Add Brand"
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
                        label="Brand name"
                        name="title"
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
                        name="file"
                        rules={[
                            {
                                required: true,
                                message: 'Please input brand logo!',
                            },
                        ]}
                        getValueFromEvent={getFile}
                    >
                        <Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={urlHelper.uploadUrl}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}>
                            {state.imgUrl ? <img src={urlHelper.fileUrl(state.imgUrl)} alt="file" style={{ width: '100%' }} /> : uploadButton}
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

export default UpsertBrand;
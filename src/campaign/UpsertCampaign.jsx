import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Input, message, DatePicker, Select } from 'antd';
import { upsertCampaign } from '../services/campaignService';
import moment from 'moment';
import { campaignStatusEnum } from '../utils/constants';
import { useSelector } from 'react-redux';
const { RangePicker } = DatePicker;

function UpsertCampaign({ onCreate, initValues, children }) {
    const [form] = Form.useForm()
    const brandInfo = useSelector(item => item.dashboard.brand)
    const cityInfo = useSelector(item => item.dashboard.city)
    const [state, setState] = useState({
        visible: false,
        confirming: false,
        campaignId: '',
    });

    const showModal = () => {
        if (initValues) {
            form.setFieldsValue({
                title: initValues.title,
                brand: initValues.brand._id,
                duration: [
                    moment(initValues.from),
                    moment(initValues.to)
                ],
                cities: initValues.cities,
            });
        }
        setState(prev => ({
            ...prev,
            visible: true,
            ...(initValues && { campaignId: initValues._id })
        }));
    };

    const handleOk = (values) => {
        setState(prev => ({ ...prev, confirming: true }));
        const [from, to] = values.duration;
console.log(values.cities)
return
        upsertCampaign({
            title: values.title,
            campaignId: state.campaignId,
            from: moment(from),
            to: moment(to),
            status: campaignStatusEnum.init,
            brand: values.brand,
            
        }).then(data => {
            message.success(`Campaign ${values.title} ${state.campaignId ? 'updated' : 'added'} successfully`);
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
            <a type="primary" onClick={showModal}>{children}</a>
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
                        label="Brand"
                        name="brand"
                        initialValue={''}
                        rules={[
                            {
                                required: true,
                                message: 'Please select a brand!',
                            },
                        ]}
                    >
                        <Select>
                            <Select.Option value="">Select a Brand</Select.Option>
                            {brandInfo.data.map(item => <Select.Option value={item._id}>
                                {item.title}
                            </Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Cities"
                        name="cities"
                        rules={[
                            {
                                required: true,
                                message: 'Please select cities!',
                            },
                        ]}
                    >
                        <Select mode="multiple" allowClear>
                            <Select.Option value="">Select Cities</Select.Option>
                            {cityInfo.data.map(item => <Select.Option value={item._id}>
                                {item.title}
                            </Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Campaign duration"
                        name="duration"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the campaign duration!',
                            },
                        ]}
                    >
                        <RangePicker style={{ width: '100%' }} />
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
import { Card, Form, Input, Button, Typography, Collapse } from "antd";
import React from "react";
const { Title } = Typography;
const { Panel } = Collapse;

function Security() {
  const onFinish = (values) => {
    console.log(values);
  };
  console.log("render");
  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={(key) => {}}>
        <Panel header={<Title level={5}>Change Password</Title>} key="1">
          <Card bordered={false} style={{ maxWidth: 500 }}>
            <Form
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Current Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                  {
                    validator: () => true,
                    message: "test",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" block htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Panel>
      </Collapse>
    </>
  );
}

export default Security;

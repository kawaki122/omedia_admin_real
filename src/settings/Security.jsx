import { Card, Form, Input, Button, Typography, Collapse, message } from "antd";
import React, { useState } from "react";
import { updatePassword } from "../services/userService";
const { Title } = Typography;
const { Panel } = Collapse;

function Security() {
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    console.log(values);
    setLoading(true);
    updatePassword({
      password: values.password,
      newPassword: values.newPassword,
    })
      .then((result) => {
        setLoading(false);
        message.success("Password changed.");
      })
      .catch((error) => {
        console.log(error.response);
        message.error(
          error.response?.data.message || "Error while changing password"
        );
        setLoading(false);
      });
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
                <Button
                  loading={loading}
                  type="primary"
                  block
                  htmlType="submit"
                >
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

import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { fetchProfile, login } from "../services/userService";
import { storageKeyEnum } from "../utils/constants";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadInitial } from "../store/actions/dashActions";
const { Title } = Typography;

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    loading: false,
  });
  const onFinish = async (values) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const result = await login({
        username: values.email,
        password: values.password,
      });
      localStorage.setItem(
        storageKeyEnum.access_token,
        result.data.access_token
      );
      setState((prev) => ({ ...prev, loading: false }));
      const loaded = await dispatch(loadInitial());
      if (loaded) {
        history.push("/dashboard");
      } else {
        message.error("Something went wrong try again.");
      }
    } catch (error) {
      console.log(error);
      message.error(error.response?.data.message || "Error loging in");
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <Card style={{ width: "400px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        O Media
      </Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email address!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email address"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={state.loading}
            block
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;

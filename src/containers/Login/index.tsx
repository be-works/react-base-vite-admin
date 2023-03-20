import React from "react";
import { SLogin } from "./styles";
import { Button, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import { useHistory } from "react-router-dom";
import { request } from "../../api/axios";
import API_URL from "src/api/url";
import { Alert } from "src/common/components/Alert";

export default function Login() {
  const history = useHistory();

  const onFinish = (values: any) => {
    if (values) {
      request({
        method: "POST",
        url: API_URL.AUTH.LOGIN,
        data: {
          ...values,
          type: 1,
        },
      })
        .then((res: any) => {
          if (res?.data?.code < 400) {
            localStorage.setItem(
              "tokenAdmin",
              JSON.stringify(res?.data?.result?.data[0]?.access_token)
            );
            localStorage.setItem(
              "usernameLapAdmin",
              JSON.stringify(res?.data?.result?.data[0]?.username)
            );
            Alert({ name: "Đăng nhập thành công", icon: "success" });
            history.push("/");
          } else {
            Alert({ name: `${res?.data?.message}`, icon: "error" });
          }
        })
        .catch((err) => {
          Alert({ name: `${err.message}`, icon: "error" });
        });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <SLogin>
      <div className="wrapper">
        <Title level={4}>Login</Title>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{ marginBottom: "15px" }}
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "15px" }}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item style={{ marginBottom: "10px" }}>
            <Button block type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </SLogin>
  );
}

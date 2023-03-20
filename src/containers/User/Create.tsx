import React, { useState } from "react";
import { InputNumber, Modal, Select } from "antd";
import { Form, Input, Button, DatePicker } from "antd";
import { requestToken } from "src/api/axios";
import { Alert } from "src/common/components/Alert";
import API_URL from "src/api/url";

const { Option } = Select;
export default function Create({ callback }: any) {
  const [state, setState] = useState<any>({
    loading: false,
    visible: false,
  });
  const { visible } = state;

  const handleOk = () => {
    setState({ loading: true });
    setTimeout(() => {
      setState({ loading: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    setState({ visible: false });
  };

  const showModal = () => {
    setState({ ...state, visible: true });
  };

  const onFinish = (values: any) => {
    const birthday = values.birthday.format("YYYY-MM-DD");
    const sex = values.sex === "false" ? false : true;

    requestToken({
      method: "POST",
      url: API_URL.USER.POST,
      data: {
        ...values,
        date_of_birth: birthday,
        sex,
        avatar: "",
      },
    })
      .then((res) => {
        setState({ visible: false });
          if (res?.data?.code < 400) {
          Alert({ name: `${res?.data?.message}`, icon: "success" });
        } else {
          Alert({ name: `${res?.data?.message}`, icon: "error" });
        }
        callback();
      })
      .catch((err) => {
        Alert({ name: `${err.message}`, icon: "error" });
      });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Thêm Người dùng
      </Button>

      <Modal
        visible={visible}
        title="Thêm Người dùng"
        width={700}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ remember: true }}
          size={"middle"}
          onFinish={onFinish}
        >
          <Form.Item
            label="Họ và tên"
            style={{ marginBottom: "15px" }}
            name="full_name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            style={{ marginBottom: "15px" }}
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            style={{ marginBottom: "15px" }}
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            style={{ marginBottom: "15px" }}
            name="mobile"
            rules={[{ required: true, message: "Please input your mobile!" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item name="sex" label="Gender" rules={[{ required: true }]}>
            <Select placeholder="" allowClear>
              <Option value="false">male</Option>
              <Option value="true">female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            style={{ marginBottom: "15px" }}
            name="birthday"
            rules={[{ required: true, message: "Please input your birthday!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Tên tài khoản"
            style={{ marginBottom: "15px" }}
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "15px" }}
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="position" label="Role" rules={[{ required: true }]}>
            <Select placeholder="" allowClear>
              <Option value="ROLE_ADMIN">Admin</Option>
              <Option value="ROLE_USER">User</Option>
            </Select>
          </Form.Item>

          <Form.Item label="">
            <Button htmlType="submit">Tạo</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

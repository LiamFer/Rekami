import { Form, Input, Button, Divider, App } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import GoogleButton from "./../Buttons/GoogleButton/GoogleButton";
import { login, register } from "../../Services/server.service";
import PictureModal from "../UploadPicture/PictureModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/userSlice";

export default function RegisterForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { notification } = App.useApp();
  const onFinish = async (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    const { name, email, password } = values;
    const response = await register(name, email, password);

    if (response.success) {
      const loginResponse = await login(email, password);
      if (loginResponse.success) {
        dispatch(setUser(loginResponse.data));
        setIsModalOpen(true);
      }
    } else {
      notification.error({
        message: "Error",
        description: response.error,
        placement: "topRight",
      });
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        variant="filled"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please enter your name" },
            {
              validator: (_, value) => {
                if (!value || value.trim().length < 6) {
                  return Promise.reject("Fix the Name!");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            minLength={6}
            maxLength={12}
            prefix={<UserOutlined />}
            placeholder="Your name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email address" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter a password" }]}
          hasFeedback
        >
          <Input.Password
            minLength={6}
            maxLength={12}
            prefix={<LockOutlined />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password
            minLength={6}
            maxLength={12}
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" block>
            Start
          </Button>
        </Form.Item>
      </Form>
      <Divider>Or</Divider>
      <GoogleButton></GoogleButton>
      <PictureModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}

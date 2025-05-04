import { Form, Input, Button, message, Divider } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import GoogleButton from "../Buttons/GoogleButton/GoogleButton";

export default function LoginForm() {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
    message.success("Registration successful!");
  };

  return (
    <div >
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        variant="filled"
      >
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
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    <Divider>Or</Divider>
      <GoogleButton></GoogleButton>
    </div>
  );
}

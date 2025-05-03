import { Form, Input, Button, Card, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

export default function RegisterForm() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
    message.success("Registration successful!");
  };

  return (
    <Form
      style={{ width: "100%", maxWidth: "400px" }}
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
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Your name" />
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
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
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
  );
}

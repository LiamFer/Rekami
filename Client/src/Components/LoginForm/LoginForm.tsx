import { Form, Input, Button, Divider, App } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import GoogleButton from "../Buttons/GoogleButton/GoogleButton";
import { login } from "../../Services/server.service";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    const response = await login(values.email, values.password);
    if (response.success) {
      dispatch(setUser(response.data));
      navigate("/");
      notification.success({
        message: "Logged In",
        description: "Welcome to Rekami!",
        placement: "topRight",
      });
    } else {
      notification.error({
        message: "Error",
        description: "Invalid Credentials!",
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
          <Input.Password
            minLength={6}
            maxLength={12}
            prefix={<LockOutlined />}
            placeholder="Password"
          />
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

import { useAuth } from "context/auth-context";

import { Button, Form } from "antd";
import { Input, LongButton } from "unauthenticated-app";

export const LoginScreen = () => {
  const { login, user } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input
          type="text"
          id={"usename"}
          placeholder={"用户名"}
          width={"100%"}
        />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="text" id={"password"} placeholder={"密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton type={"primary"} htmlType={"submit"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

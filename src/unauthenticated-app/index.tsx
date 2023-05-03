import { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import { Button, Card, Divider } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

export const UnauthenticatedApp = () => {
  const [isgister, setisgister] = useState(false);

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isgister ? "请注册" : "请登录"}</Title>
        {isgister ? <RegisterScreen /> : <LoginScreen />}
        <Divider />
        <a onClick={() => setisgister(!isgister)}>
          {isgister ? "还没有账户，去注册" : "已有账户，去登录"}
        </a>
      </ShadowCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 28rem;
  min-height: 30rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5em 0;
  background-size: 8em;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: Left bottom, right bottom;
  background-size: calc(((100vw 40rem) / 2)-3.2rem),
    calc(((100vw 40rem) / 2)-3.2rem) cover;
  background-image: url(${left}), url(${right});
`;

const Title = styled.h2`
  color: rgb(94, 108, 132);
`;

export const LongButton = styled(Button)`
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
`;

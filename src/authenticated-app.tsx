import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetURL } from "utils";
export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader></PageHeader>
      <Main>
        <Router>
          <Routes>
            <Route path={"projects"} element={<ProjectListScreen />} />
            <Route path={"projects/:projectId/*"} element={<ProjectScreen />} />
            <Route index element={<ProjectListScreen />} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const a = ["12", 12] as const;
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={"link"} onClick={() => resetURL()}>
          <SoftwareLogo width={"15rem"} color={"rgb(38,132,255)"} />
        </Button>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type={"link"} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"}>HI,{user ? user.name : ""}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
  grid-template-areas:
    "header"
    "main";
`;
const Header = styled(Row)`
  padding: 2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;

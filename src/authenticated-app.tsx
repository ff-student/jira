import styled from "@emotion/styled";
import { ButtonNopadding, Row } from "./components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetURL } from "utils";
import { useState } from "react";
import { ProjectModal } from "screens/project-list/project-model";
import { ProjectPopover } from "components/project-popover";
export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"projects"}
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
              }
            />
            <Route path={"projects/:projectId/*"} element={<ProjectScreen />} />
            <Route
              index
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
              }
            />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      ></ProjectModal>
    </Container>
  );
};

const PageHeader = (props: {
  setProjectModalOpen: (isopen: boolean) => void;
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNopadding type={"link"} onClick={() => resetURL()}>
          <SoftwareLogo width={"15rem"} color={"rgb(38,132,255)"} />
        </ButtonNopadding>
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <User></User>
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
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

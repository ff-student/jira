import { SearchPannel } from "./search-panel";
import { List, Project } from "./list";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";
import { ButtonNopadding, Row } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list,slice";

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle("项目列表", false);
  const [setParam, param] = useProjectsSearchParams();
  const debonced = useDebounce(param, 200);
  const { isLoading, error, data: list, retry } = useProjects(debonced);
  const { data: users } = useUsers();
  const dispatch = useDispatch();
  return (
    <Container>
      <Row between={true}>
        <H1>项目列表</H1>
        <ButtonNopadding
          onClick={() => dispatch(projectListActions.openProjectModalOpen())}
        >
          创建项目
        </ButtonNopadding>
      </Row>
      <SearchPannel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text>error.message</Typography.Text> : null}
      <List
        projectButton={props.projectButton}
        refersh={retry}
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
      ></List>
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
const H1 = styled.h1`
  display: flex;
`;

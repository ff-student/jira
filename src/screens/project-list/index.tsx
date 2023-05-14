import { SearchPannel } from "./search-panel";
import { List, Project } from "./list";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./util";
// import { SearchResults } from "./test";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [setParam, param] = useProjectsSearchParams();
  const debonced = useDebounce(param, 200);
  const { isLoading, error, data: list, retry } = useProjects(debonced);
  const { data: users } = useUsers();

  return (
    <Container>
      {/* <SearchResults></SearchResults> */}
      <H1>项目列表</H1>
      <SearchPannel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text>error.message</Typography.Text> : null}
      <List
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

import { SearchPannel } from "./search-panel";
import { List, Project } from "./list";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
// import { SearchResults } from "./test";

export const ProjectListScreen = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  console.log(param);
  const debonced = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debonced);
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);
  return (
    <Container>
      {/* <SearchResults></SearchResults> */}
      <H1>项目列表</H1>
      <SearchPannel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text>error.message</Typography.Text> : null}
      <List
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

import { SearchPannel } from "./search-panel";
import { List, Project } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debonced = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debonced);
  const { data: users } = useUsers();

  return (
    <Container>
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

const Container = styled.div`
  padding: 3.2rem;
`;
const H1 = styled.h1`
  display: flex;
`;

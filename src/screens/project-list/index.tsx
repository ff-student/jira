import { SearchPannel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [users, setusers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debonced = useDebounce(param, 2000);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debonced) }).then(setList);
  }, [debonced]);

  useMount(() => {
    client("users").then(setusers);
  });

  return (
    <Container>
      <SearchPannel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPannel>
      <List list={list} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

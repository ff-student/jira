import { SearchPannel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";

const apiURL = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setusers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    id: "",
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
    <div>
      <SearchPannel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPannel>
      <List list={list} users={users}></List>
    </div>
  );
};

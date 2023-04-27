import { SearchPannel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import React from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import * as qs from "qs";

const apiURL = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setusers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    id: "",
  });
  const debonced = useDebounce(param, 2000);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/projects?${qs.stringify(cleanObject(debonced))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [debonced]);

  useMount(() => {
    fetch(`${apiURL}/users`).then(async (response) => {
      if (response.ok) {
        setusers(await response.json());
      }
    });
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

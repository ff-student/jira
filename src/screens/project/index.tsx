import { Epic } from "screens/epic";
import { Kanban } from "screens/kanban";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";

export const ProjectScreen = () => {
  return (
    <div>
      <Link to={"kanban"}>任务看板</Link>
      <br />
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"kanban"} element={<Kanban />}></Route>
        <Route path={"epic"} element={<Epic />}></Route>
        <Route index element={<Kanban />}></Route>
      </Routes>
    </div>
  );
};

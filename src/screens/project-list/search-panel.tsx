import { Form, Select } from "antd";
import { Project } from "./list";
import { UserSelect } from "./user-select";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPannelProps {
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPannelProps["param"]) => void;
  users: User[];
}

export const SearchPannel = ({ param, setParam, users }: SearchPannelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value?: number | undefined) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        ></UserSelect>
      </Form.Item>
    </Form>
  );
};

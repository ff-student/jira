import { Dropdown, ListProps, Menu, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNopadding } from "components/lib";
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
}
interface listprops extends TableProps<Project> {
  users: User[];
  refersh?: () => void;
  setProjectModalOpen: (isopen: boolean) => void;
}

export const List = ({ users, ...props }: listprops) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refersh);
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
            );
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      <ButtonNopadding
                        type={"link"}
                        onClick={() => props.setProjectModalOpen(true)}
                      >
                        编辑
                      </ButtonNopadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNopadding type={"link"}>...</ButtonNopadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};

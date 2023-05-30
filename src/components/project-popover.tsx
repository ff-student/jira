import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useDispatch } from "react-redux";
import { useProjects } from "utils/project";
import { ButtonNopadding } from "./lib";
import { projectListActions } from "screens/project-list/project-list,slice";

export const ProjectPopover = () => {
  const dispatch = useDispatch();
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider></Divider>
      <ButtonNopadding
        onClick={() => dispatch(projectListActions.openProjectModalOpen())}
      >
        创建项目
      </ButtonNopadding>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <h3>项目</h3>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;

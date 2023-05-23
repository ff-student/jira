import { Button, Drawer } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer width={"100%"} open={props.projectModalOpen}>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};

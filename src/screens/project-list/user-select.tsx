import { IdSelect } from "components/id-select";
import { useUsers } from "utils/user";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};

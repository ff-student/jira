import { useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { cleanObject } from "utils";
import { User } from "screens/project-list/search-panel";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};

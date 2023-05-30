import { ReactNode, useCallback, useState } from "react";
import * as auth from "auth_provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallbak, FullPageLoading } from "components/lib";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { bootstrap, selectUser } from "store/auth.slice";

export interface AuthForm {
  username: string;
  password: string;
}

//判断是否已经有token
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  // const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  useMount(() => {
    run(dispatch(bootstrap()));
  });
  //当判断是否有token时显示加载中
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  //全局错误提升
  if (isError) {
    return <FullPageErrorFallbak error={error}></FullPageErrorFallbak>;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  // const dispatch: ThunkDispatch<RootState, undefined, any> = useDispatch();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  // const dispatch: Dispatch<AnyAction> = useDispatch()
  const user = useSelector(selectUser);
  // const login = (form: AuthForm) => auth.login(form).then(setUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  login({ username: "123", password: "456" }).then();
  return {
    user,
    login,
    register,
    logout,
  };
};

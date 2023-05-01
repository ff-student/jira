import { FormEvent } from "react";

import { useAuth } from "context/auth-context";

export const RegisterScreen = () => {
  const { register, user } = useAuth();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //阻止表单默认行为
    event.preventDefault();
    //获取表单内容包括(用户名，密码)
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"usename"} />
      </div>
      <div>
        <label htmlFor="passeord">密码</label>
        <input type="text" id={"password"} />
      </div>
      <button type={"submit"}>注册</button>
    </form>
  );
};

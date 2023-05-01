import { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";

export const UnauthenticatedApp = () => {
  const [isgister, setisgister] = useState(false);

  return (
    <div>
      {isgister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setisgister(!isgister)}>
        切换到{isgister ? "注册" : "登录"}
      </button>
    </div>
  );
};

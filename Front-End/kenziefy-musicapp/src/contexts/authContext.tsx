import Toast from "@/components/toast";
import {
  LoginData,
  ResetPasswordData,
  SendEmailResetPasswordData,
  UserData
} from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode, createContext, useContext } from "react";

interface Props {
  children: ReactNode;
}

interface AuthProviderData {
  register: (userData: UserData) => void;
  login: (loginData: LoginData) => void;
  sendEmail: (data: SendEmailResetPasswordData) => void;
  resetPassword: (data: ResetPasswordData, token: string) => void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();

  const register = (userData: UserData) => {
    api
      .post("/users", userData)
      .then(() => {
        Toast({ message: "Usuário cadastrado com sucesso", isSucess: true });
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
        Toast({ message: "Erro ao criar usuário, tente utilizar outro e-mail" });
      });
  };

  const login = (loginData: LoginData) => {
    api
      .post("/login", loginData)
      .then((response) => {
        setCookie(null, "kenziefy.token", response.data.token, {
          maxAge: 60 * 30,
          path: "/"
        });
      })
      .then(() => {
        Toast({ message: "Login cadastrado com sucesso", isSucess: true });
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        Toast({ message: "Erro ao logar, verifique se o e-mail e senha estão corretos" });
      });
  };

  const sendEmail = (data: SendEmailResetPasswordData) => {
    api
      .post("/users/resetPassword", data)
      .then(() => {
        Toast({ message: "E-mail enviado com sucesso", isSucess: true });
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        Toast({ message: "Erro ao enviar o e-mail, tente novamente mais tarde" });
      });
  };

  const resetPassword = (data: ResetPasswordData, token: string) => {
    api
      .patch(`/users/resetPassword/${token}`, { password: data.password })
      .then(() => {
        Toast({ message: "Senha atualizada com sucesso", isSucess: true });
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        Toast({ message: "Erro ao atualizar a senha" });
      });
  };

  return (
    <AuthContext.Provider value={{ register, login, sendEmail, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

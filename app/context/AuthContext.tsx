import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Auth } from "@aws-amplify/auth";

const initialUser = {
  uuid: "",
  token: "",
  userType: "",
  userName: "",
  email: "",
  isLoggedIn: false,
};
export type TTAuthUser = {
  uuid: string;
  token: string;
  userType: string;
  userName: string;
  email: string;
  isLoggedIn: boolean;
};

type TTLoginResponse =
  | {
      success: false;
      errorMessage: string;
      errorCode: string;
    }
  | ({
      success: true;
    } & TTAuthUser);

interface AuthContextProps {
  user: TTAuthUser;
  error: string;
  loading: boolean;
  tokenLoading: boolean;

  setUser: React.Dispatch<React.SetStateAction<TTAuthUser>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  login: (email: string, password: string) => Promise<TTLoginResponse>;
  logout: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    userRole: string
  ) => Promise<TTLoginResponse>;
  getCurrentUser: () => Promise<TTAuthUser>;
  deleteAccount: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  forgotPasswordSubmit: (
    email: string,
    code: string,
    new_password: string
  ) => Promise<TTLoginResponse>;
}
export const AuthContext = createContext<AuthContextProps>({
  user: initialUser,
  error: "",
  loading: false,
  tokenLoading: false,

  setUser: () => {},
  setError: () => {},
  setLoading: () => {},

  login: (email: string, password: string) =>
    Promise.resolve({} as TTLoginResponse),
  logout: () => Promise.resolve(),
  signUp: (email: string, password: string, name: string, userRole: string) =>
    Promise.resolve({} as TTLoginResponse),
  getCurrentUser: () => Promise.resolve(initialUser),
  deleteAccount: () => Promise.resolve(),

  forgotPassword: (email: string) => Promise.resolve(),
  forgotPasswordSubmit: (email: string, code: string, new_password: string) =>
    Promise.resolve({} as TTLoginResponse),
});

export const AuthProvider = ({ children }: PropsWithChildren<any>) => {
  const [user, setUser] = useState<TTAuthUser>({
    uuid: "",
    token: "",
    userType: "",
    userName: "",
    email: "",
    isLoggedIn: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(true);

  const getCurrentUser = useCallback(async () => {
    setTokenLoading(true);
    setError("");
    let _user = initialUser as TTAuthUser;
    try {
      const user = await Auth.currentAuthenticatedUser();
      _user = {
        uuid: user.username,
        token: user.signInUserSession.idToken.jwtToken,
        userType: user.attributes["custom:userType"],
        userName: user.attributes.name,
        email: user.attributes.email,
        isLoggedIn: true,
      };
      setUser(_user);
      setTokenLoading(false);
      return _user;
    } catch (error: any) {
      // setError(error.message);
      setTokenLoading(false);
    }
    return _user;
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      console.log("login");
      setLoading(true);
      setError("");
      let errorMsg = "";
      if (!email.trim()) errorMsg = "Please enter an email";
      if (!password.trim()) errorMsg = "Please enter a password";
      if (errorMsg) {
        setError(errorMsg);
        setLoading(false);
        return {
          success: false,
          errorMessage: errorMsg,
          errorCode: "InvalidInput",
        } as TTLoginResponse;
      }

      try {
        console.log("login");
        await Auth.signIn(email, password);
        const _user = await getCurrentUser();
        setLoading(false);
        return {
          success: true,
          ..._user,
        } as TTLoginResponse;
      } catch (error: any) {
        const code = error.code;
        switch (code) {
          case "UserNotFoundException":
            errorMsg = "User not found";
            break;
          case "NotAuthorizedException":
            errorMsg = "Incorrect password";
            break;
          case "UserNotConfirmedException":
            errorMsg = "Please contact us to confirm your account";
            break;
          case "PasswordResetRequiredException":
            errorMsg = "Please reset your password";
            break;
          default:
            errorMsg =
              "We are having trouble logging you in, please try again later";
            break;
        }
        setLoading(false);
        return {
          success: false,
          errorMessage: errorMsg,
          errorCode: code,
        } as TTLoginResponse;
      }
    },
    [getCurrentUser]
  );

  const signUp = useCallback(
    async (email: string, password: string, name: string, userRole: string) => {
      setLoading(true);
      setError("");
      let errorMsg = "";
      if (!email.trim()) errorMsg = "Please enter an email";
      if (!password.trim()) errorMsg = "Please enter a password";
      if (!name.trim()) errorMsg = "Please enter a name";
      if (!userRole.trim()) errorMsg = "Please select a user role";
      if (errorMsg) {
        setError(errorMsg);
        setLoading(false);
        return {
          success: false,
          errorMessage: errorMsg,
          errorCode: "InvalidInput",
        } as TTLoginResponse;
      }
      try {
        await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            email: email,
            "custom:userType": userRole,
            name: name,
          },
        });
        await login(email, password);
        setLoading(false);
        return {
          success: true,
        } as TTLoginResponse;
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
        return {
          success: false,
          errorMessage: error.message,
          errorCode: error.code,
        } as TTLoginResponse;
      }
    },
    [login]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      await Auth.signOut();
      setUser({
        uuid: "",
        token: "",
        userType: "",
        userName: "",
        email: "",
        isLoggedIn: false,
      });
    } catch (error: any) {
      setLoading(false);
    }
    setLoading(false);
  }, []);

  const deleteAccount = useCallback(async () => {
    setTokenLoading(true);
    setError("");

    try {
      await Auth.deleteUser();
      setUser({
        uuid: "",
        token: "",
        userType: "",
        userName: "",
        email: "",
        isLoggedIn: false,
      });
    } catch (error: any) {
      setError(error.message);
    }
    setTokenLoading(false);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      setLoading(true);
      await Auth.forgotPassword(email);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  const forgotPasswordSubmit = useCallback(
    async (email: string, code: string, new_password: string) => {
      try {
        let errorMsg = "";
        if (!email.trim()) errorMsg = "Please enter an email";
        if (!code.trim()) errorMsg = "Please enter a code";
        if (!new_password.trim()) errorMsg = "Please enter a new password";
        if (errorMsg) {
          setError(errorMsg);
          return {
            success: false,
            errorMessage: errorMsg,
            errorCode: "InvalidInput",
          } as TTLoginResponse;
        }
        setLoading(true);
        await Auth.forgotPasswordSubmit(email, code, new_password);
        setLoading(false);
        return {
          success: true,
        } as TTLoginResponse;
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
        return {
          success: false,
          errorMessage: error.message,
          errorCode: error.code,
        } as TTLoginResponse;
      }
    },
    []
  );

  const values = useMemo(
    () => ({
      user,
      setUser,
      login,
      signUp,
      logout,
      error,
      loading,
      getCurrentUser,
      tokenLoading,
      setError,
      deleteAccount,
      setLoading,
      forgotPassword,
      forgotPasswordSubmit,
    }),
    [
      user,
      setUser,
      login,
      signUp,
      logout,
      error,
      loading,
      getCurrentUser,
      tokenLoading,
      setError,
      deleteAccount,
      setLoading,
      forgotPassword,
      forgotPasswordSubmit,
    ]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
export const useAuthUser = () => React.useContext(AuthContext).user;

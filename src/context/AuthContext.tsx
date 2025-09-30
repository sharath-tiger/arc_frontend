import { createContext, PropsWithChildren, useMemo, useState } from "react";
interface AuthContextType {
  user: string;
  role: string | null;
  setUserDetails: (_user: string, _role: string) => void;
}
export const AuthContext = createContext<AuthContextType>({
  user: "",
  role: null,
  setUserDetails: () => {},
});

export const AuthProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState("");
  const [role, setRole] = useState(null);
  const setUserDetails = (_user: string, _role: string) => {
    setUser(_user);
    setRole(_role);
  };
  const authContextValue = useMemo(() => {
    return {
      user,
      role,
      setUserDetails,
    };
  }, [user, role]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

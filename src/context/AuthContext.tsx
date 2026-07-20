import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { User, onAuthStateChanged } from "firebase/auth";

import { auth } from "@/src/config/firebase";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
} from "@/src/services/auth.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const login = async (
    email: string,
    password: string
  ) => {
    await loginService(email, password);
  };

  const register = async (
    email: string,
    password: string
  ) => {
    await registerService(email, password);
  };

  const logout = async () => {
    await logoutService();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider"
    );
  }

  return context;
}
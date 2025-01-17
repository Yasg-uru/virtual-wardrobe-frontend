import { useToast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/helper/axiosInstance";

import { User } from "@/types/Authstate";
import { createContext, useContext, useEffect, useState } from "react";

interface authContextProps {
  isAuthenticated: boolean;
  AuthUser: User | null;
  isLoading: boolean;
  checkAuth:()=>void;

}
const authContext = createContext<authContextProps | undefined>(undefined);
export const AuthProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [AuthUser, setAuthUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
   const checkAuth = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.get("/user/check-auth", {
        withCredentials: true,
      });
      toast({
        title: "auth checked successfully",
      });
      setIsAuthenticated(true);
      setAuthUser(response.data.user || []);
    } catch (error) {
      toast({
        title: "failed to check auth",
      });
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <authContext.Provider value={{ isLoading, isAuthenticated, AuthUser,checkAuth }}>
      {children}
    </authContext.Provider>
  );
};
export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("please use authcontext within the scope");
  }
  return context;
};

import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/authContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RequireAuth: React.FC = () => {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        toast({
          title: "Please log in to continue",
          variant: "destructive",
        });
        navigate("/auth");
      }
    }
  }, [isAuthenticated, isLoading, navigate, toast]);

  return isAuthenticated ? <Outlet /> : null;
};

export default RequireAuth;

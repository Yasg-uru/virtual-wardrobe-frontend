import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
interface props {
  allowedRoles: string[];
}
const RequireAuth: React.FC<props> = ({ allowedRoles }) => {
  const { toast } = useToast();

  const { isAuthenticated, userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const isUserAllowed = userInfo?.roles.some((role) =>
    allowedRoles.includes(role)
  );
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Please Login to continue",
        variant: "destructive",
      });
      navigate("/auth");
    }

    if (!isUserAllowed) {
      toast({
        title: "Unauthorized access",
        description: `${userInfo?.roles} is not allowed to access this resources`,
        variant: "destructive",
      });
      navigate("/unauthorized"); // navigating user to the unauthorized access
    }
  }, [isAuthenticated, navigate, allowedRoles, userInfo?.roles]);
  return <>{isAuthenticated && isUserAllowed && <Outlet />}</>;
};
export default RequireAuth;

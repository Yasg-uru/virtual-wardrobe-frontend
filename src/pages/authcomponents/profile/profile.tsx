import React, { useState } from "react";
import {  useAppDispatch } from "@/redux/hook";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Loader2,
  PenSquare,
  BarChart2,
  Bell,
  Archive,
  LogOut,
} from "lucide-react";

import { Logout } from "@/redux/slices/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { ProfileInfo } from "./profile-info";
import { EditProfileDialog } from "./edit-profile";
import { useAuthContext } from "@/context/authContext";

const Profile: React.FC = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { AuthUser: user } = useAuthContext();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(Logout({ ex: "yash" }))
      .unwrap()
      .then(() => {
        toast({
          title: "Logged out successfully",
          variant: "default",
        });
        navigate("/auth");
      })
      .catch(() => {
        toast({
          title: "Failed to logout",
          description: "Error, please try again later",
        });
      });
  };

  return (
    <div className="min-h-screen justify-center items-center dark:bg-black pt-5">
      <Card className="max-w-4xl mx-auto  dark:bg-black">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.profileUrl || ""} alt={user.username} />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-bold">{user.username}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileInfo user={user} />
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-2">
          <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
            <PenSquare className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
          <Button variant="outline" onClick={() => navigate("/wear/analysis")}>
            <BarChart2 className="mr-2 h-4 w-4" /> Wear Analysis
          </Button>
          <Button variant="outline" onClick={() => navigate("/notifications")}>
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Button>
          <Button variant="outline" onClick={() => navigate("/archive")}>
            <Archive className="mr-2 h-4 w-4" /> Archive
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </CardFooter>
      </Card>
      <EditProfileDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        user={user}
      />
    </div>
  );
};

export default Profile;

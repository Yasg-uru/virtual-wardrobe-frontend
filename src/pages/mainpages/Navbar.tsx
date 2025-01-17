import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Logout } from "@/redux/slices/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  User,
  LifeBuoy,
  LogOut,
  Loader2,
  Archive,
  PlusCircle,
  Home,
  Grid,
  Menu,
  X,
} from "lucide-react";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import Notification from "./Notification";

import { useMediaQuery } from "@uidotdev/usehooks";
import SearchBar from "./Search";

const Navbar: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, Loading, userInfo } = useAppSelector(
    (state) => state.auth
  );

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

  const handleWearAnalysis = () => {
    navigate("/wear/analysis");
  };

  if (isMobile) {
    return <MobileTabBar />;
  }

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/wardrobe-5849594-4898100.png"
                alt="Logo"
              />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/add"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  + Add Cloth
                </Link>
                <Link
                  to="/collections"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Collections
                </Link>
                <Link
                  to="/support"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar />
            <ModeToggle />
            <Notification />
            {!isAuthenticated ? (
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                size="sm"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={userInfo?.profileUrl || ""}
                      alt={userInfo?.username}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {userInfo?.username
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleWearAnalysis}>
                      <TbBrandGoogleAnalytics className="mr-2 h-4 w-4" />
                      <span>Wear Analysis</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/support")}>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/archive")}>
                    <Archive className="mr-2 h-4 w-4" />
                    <span>Archive</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>
                      {Loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Log Out"
                      )}
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const MobileTabBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/wardrobe-5849594-4898100.png"
                alt="Logo"
              />
            </Link>
            <div className="flex items-center">
              <SearchBar />
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background p-6 shadow-lg">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-grow">
                <Link
                  to="/"
                  className="flex items-center py-2 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="mr-3 h-4 w-4" />
                  Home
                </Link>
                <Link
                  to="/add"
                  className="flex items-center py-2 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PlusCircle className="mr-3 h-4 w-4" />
                  Add Cloth
                </Link>
                <Link
                  to="/collections"
                  className="flex items-center py-2 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Grid className="mr-3 h-4 w-4" />
                  Collections
                </Link>
                <Link
                  to="/support"
                  className="flex items-center py-2 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LifeBuoy className="mr-3 h-4 w-4" />
                  Support
                </Link>
              </div>
              <div>
                <ModeToggle />
                <Notification />
                {/* Add user menu here */}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Link
            to="/"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50"
          >
            <Home className="w-5 h-5 mb-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Home</span>
          </Link>
          <Link
            to="/add"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50"
          >
            <PlusCircle className="w-5 h-5 mb-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Add</span>
          </Link>
          <Link
            to="/collections"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50"
          >
            <Grid className="w-5 h-5 mb-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Collections</span>
          </Link>
          <Link
            to="/support"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50"
          >
            <LifeBuoy className="w-5 h-5 mb-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Support</span>
          </Link>
          <Link
            to="/profile"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50"
          >
            <User className="w-5 h-5 mb-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

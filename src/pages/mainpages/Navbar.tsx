import { useState } from "react";
import {
  Menu,
  X,
  CreditCard,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  Loader2,
  Archive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaFileArchive } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";

import { Link, useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import SearchBar from "./Search";
import Notification from "./Notification";
import { GetWearAnalysis } from "@/redux/slices/clothSlice";
import { Logout } from "@/redux/slices/authSlice";
import { useMediaQuery } from "@uidotdev/usehooks";
export const Navbar: React.FunctionComponent = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const { isAuthenticated, Loading, userInfo } = useAppSelector(
    (state) => state.auth
  );
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleWearAnalysis = () => {
    dispatch(GetWearAnalysis({ ex: "" }))
      .unwrap()
      .then(() => {
        toast({
          title: "Fetched your analysis successfully",
        });
        navigate("/wear/analysis");
      })
      .catch((error: any) => {
        console.log("This is an error in the action dispatch:", error);
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };

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
  console.log("this is a mobile or not :", isMobile);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src={"procoders"} alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/">Home</Link>

                <Link
                  to="/add"
                  className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  + Add Cloth
                </Link>
                <Link
                  to="/collections"
                  className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Collections
                </Link>
                <Link
                  to="/support"
                  className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Support
                </Link>
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center gap-6 md:ml-6">
              <ModeToggle />
              <Notification />
              {!isAuthenticated ? (
                <Button
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300 animate-bounce hover:animate-none"
                  size="sm"
                  onClick={() => navigate("/auth")}
                >
                  Sign In
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage
                        src={"profileUrl"}
                        alt={userInfo?.username}
                      />
                      <AvatarFallback className="font-bold text-xl dark:bg-black bg-red-400 cursor-pointer">
                        {userInfo?.username.split(" ")[0][0].toUpperCase()}
                        {userInfo?.username.split(" ")[1]?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <Link to="/profile">Profile</Link>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="space-x-2"
                        onClick={handleWearAnalysis}
                      >
                        <TbBrandGoogleAnalytics size={26} color="green" />
                        <span>Wear Analysis</span>
                        <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LifeBuoy className="mr-2 h-4 w-4" />
                      <Link to="/support">
                        <span>Support</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="mr-2 h-4 w-4" />
                      <Link to="/archive">
                        <span>Archive</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>
                        {Loading ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          "Log Out"
                        )}
                      </span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          {isMobile && <SearchBar />}
          <div className="-mr-2 flex md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMenu}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Open main menu</span>
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/add"
            className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            + Add Cloth
          </Link>
          <Link
            to="/collections"
            className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Collections
          </Link>
          <Link
            to="/support"
            className="text-gray-900 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          >
            Support
          </Link>

          <ModeToggle />
          {!isAuthenticated ? (
            <Button
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
              size="sm"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={"profileUrl"} alt={userInfo?.username} />
                    <AvatarFallback className="font-bold text-xl dark:bg-black bg-red-400 cursor-pointer">
                      {userInfo?.username.split(" ")[0][0].toUpperCase()}
                      {userInfo?.username.split(" ")[1]?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <Link to="/profile">Profile</Link>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="space-x-2"
                      onClick={handleWearAnalysis}
                    >
                      <TbBrandGoogleAnalytics size={26} color="green" />
                      <span>Wear Analysis</span>
                      <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <Link to="/support">
                      <span>Support</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>
                      {Loading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        "Log Out"
                      )}
                    </span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>
                  {Loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    "Log Out"
                  )}
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

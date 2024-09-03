

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import SignUp from "./Register";

const Tabcomponent: React.FunctionComponent = () => {
  // const [tabActive, setTabActive] = useState<"Login" | "Register">("Login");
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Tabs defaultValue="Login" className="w-[400px] ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="Login"
            className={"border-[0.5px] border-red-500"}
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="Register"
            className={"border-[0.5px] border-red-500"}
          >
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Login />
        </TabsContent>
        <TabsContent value="Register">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Tabcomponent;

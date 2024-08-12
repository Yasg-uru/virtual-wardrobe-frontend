import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { userLogin } from "@/redux/slices/authSlice";
import LoginSchema from "@/schema/authSchema/Login";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const Login: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const Loading = useAppSelector((state) => state.auth.Loading);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    dispatch(userLogin(data))
      .then(() => {
        toast({
          title: "Logged in successfully",
        });
      })
      .catch((error) => {
        toast({
          title: error?.message,
        });
      });
  };
  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-slate-900">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        Login
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    className="border-gray-300 rounded-md shadow-sm focus:ring-red-500 dark:border-red-600 dark:bg-gray-700 dark:focus:ring-red-400 dark:placeholder-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                  Your email address or username.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter password"
                    type="password"
                    className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400 dark:placeholder-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                  Your account password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-md shadow-lg hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gradient-to-r dark:from-pink-600 dark:to-pink-500 dark:hover:from-pink-700 dark:hover:to-pink-600 dark:focus:ring-pink-500"
          >
            {Loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Register here
          </Link>
        </span>
        <br />
        <span className="text-sm text-gray-600 dark:text-gray-300">
          If you forgot password?{" "}
          <Link
            to="/forgot-password"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            click here
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Login;


import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { ForgotPasswordSchema } from "@/schema/authSchema/forgotPassword";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ForgotPassword } from "@/redux/slices/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";


const ForgotPass = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
 

  const { Loading } = useAppSelector((state) => state.auth);
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ForgotPasswordSchema>) => {
    console.log(data);
    // Handle form submission logic here
    dispatch(ForgotPassword(data))
      .unwrap()
      .then(() => {
        toast({
          title: "Email sent successfully",
        });
        // navigate("/Reset-password");
      })
      .catch((error: any) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center dark:bg-slate-900 ">
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg  dark:bg-slate-900 border-[0.5px] border-red-600 shadow-slate-700 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Forgot Password
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
                      className="border-gray-300 rounded-md shadow-sm focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-red-400 dark:placeholder-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                    Enter the email associated with your account.
                  </FormDescription>
                  <FormMessage className=" italic font-bold text-md text-red-600" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500"
            >
              {Loading ? (
                <Loader2 className="animate-spin h-6 w-6" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPass;

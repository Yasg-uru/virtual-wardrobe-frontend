import { useState } from "react";
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
import { userSignUp } from "@/redux/slices/authSlice";
import SignUpSchema from "@/schema/authSchema/SignupSchema";
import { Loader2, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const SignUp: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const Loading = useAppSelector((state) => state.auth.Loading);
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      profile: "Student", // default profile selection
      profilePicture: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    const formData: any = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile", data.profile);
    if (data.profilePicture) {
      formData.append("profilePicture", data.profilePicture);
    }

    dispatch(userSignUp(formData))
      .then(() => {
        toast({
          title: "Sign up successful",
        });
        navigate(`/verify/${data.email}`);
      })
      .catch((error: any) => {
        toast({
          title: error?.message,
        });
      });
  };

  const handleFileChange = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("profilePicture", file);
    } else {
      setImagePreview(null);
      form.setValue("profilePicture", undefined);
    }
  };

  const handleIconClick = () => {
    const fileInput = document.getElementById("profilePictureInput");
    fileInput?.click();
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        Sign Up
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="profilePicture"
            render={() => (
              <FormItem className=" flex flex-col justify-center items-center">
                <FormLabel className="text-sm font-medium  text-gray-700 dark:text-gray-300">
                  Profile Picture
                </FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <input
                      id="profilePictureInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e.target.files?.[0])}
                    />
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Avatar Preview"
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        onClick={handleIconClick}
                      />
                    ) : (
                      <User
                        className="w-10 h-10 text-gray-400 dark:text-gray-500 cursor-pointer rounded-full "
                        onClick={handleIconClick}
                      />
                    )}
                  </div>
                </FormControl>
                <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                  Upload a profile picture.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jhone doe"
                    type="username"
                    className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400 dark:placeholder-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                  Your username.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400 dark:placeholder-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                  Your email address.
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
            {Loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Sign Up"}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Login here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;

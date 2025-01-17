import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { z } from "zod";

import LoginSchema from "@/schema/authSchema/Login";
import { AuthState, User } from "@/types/Authstate";
import { VerifyFormSchema } from "@/pages/authcomponents/VerifyComponent";
import { ForgotPasswordSchema } from "@/schema/authSchema/forgotPassword";
import { ResetPasswordSchema } from "@/schema/authSchema/ResetPass";
import { axiosInstance } from "@/helper/axiosInstance";
import { AxiosError } from "axios";
const LoadData = (): User | null => {
  const data = localStorage.getItem("user");
  if (data) {
    const parsedData = JSON.parse(data);
    return parsedData;
  }
  return null;
};
const savedata = (data: User): void => {
  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("isAuthenticated", "true");
};
const initialState: AuthState = {
  Loading: false,
  userInfo: LoadData(),
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false,
};

export type axiosError = AxiosError<{ message: string }>;
export const userSignUp = createAsyncThunk(
  "auth/register",
  async (formdata: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/create", formdata, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      const err: axiosError = error as axiosError;

      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
export const userVerify = createAsyncThunk(
  "auth/verify",
  async (params: z.infer<typeof VerifyFormSchema>, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/verify", params, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      const err: axiosError = error as axiosError;

      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
export const userLogin = createAsyncThunk(
  "auth/login",
  async (formdata: z.infer<typeof LoginSchema>, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/Login", formdata, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      const err: axiosError = error as axiosError;
      console.log("error in login :", error);
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
export const ForgotPassword = createAsyncThunk(
  "auth/forgotpassword",
  async (
    formdata: z.infer<typeof ForgotPasswordSchema>,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/user/forgotpassword/${formdata.email}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      const err: axiosError = error as axiosError;

      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
export const ResetPassword = createAsyncThunk(
  "auth/resetpassword",
  async (
    formdata: z.infer<typeof ResetPasswordSchema>,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `/user/reset/${formdata.token}`,
        { password: formdata.newPassword },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      const err: axiosError = error as axiosError;

      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
export const Logout = createAsyncThunk(
  "auth/logout",
  async (params: { ex: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/user/logout",
        {
          ex: params.ex,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      const err: axiosError = error as axiosError;

      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
export const editProfile = createAsyncThunk(
  "auth/editprofile",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/user/edit-profile", data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const err: axiosError = error as axiosError;

      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.userInfo = action.payload?.user;
      savedata(action.payload.user);
      state.Loading = false;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.Loading = false;
    });
    builder.addCase(userSignUp.fulfilled, (state) => {
      state.Loading = false;
    });
    builder.addCase(userSignUp.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(userSignUp.rejected, (state) => {
      state.Loading = false;
    });
    builder.addCase(ForgotPassword.fulfilled, (state) => {
      state.Loading = false;
    });
    builder.addCase(ForgotPassword.rejected, (state) => {
      state.Loading = false;
    });
    builder.addCase(ForgotPassword.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(ResetPassword.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(ResetPassword.fulfilled, (state) => {
      state.Loading = false;
    });
    builder.addCase(ResetPassword.rejected, (state) => {
      state.Loading = false;
    });
    builder.addCase(Logout.rejected, (state) => {
      state.Loading = false;
    });
    builder.addCase(Logout.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(Logout.fulfilled, (state) => {
      state.Loading = false;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;

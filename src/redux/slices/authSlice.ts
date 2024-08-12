import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authInstance } from "@/helper/axiosInstance";
import { z } from "zod";
import SignUpSchema from "@/schema/authSchema/SignupSchema";
import LoginSchema from "@/schema/authSchema/Login";
import { AuthState, User } from "@/types/Authstate";
import { VerifyFormSchema } from "@/pages/authcomponents/VerifyComponent";
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
export const userSignUp = createAsyncThunk(
  "auth/register",
  async (formdata: any, { rejectWithValue }) => {
    try {
      const response = await authInstance.post("/user/create", formdata, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        rejectWithValue(error.response?.data?.message);
      }
      rejectWithValue("Unknown error");
    }
  }
);
export const userVerify = createAsyncThunk(
  "auth/verify",
  async (params: z.infer<typeof VerifyFormSchema>, { rejectWithValue }) => {
    try {
      const response = await authInstance.post("/user/verify", params, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        rejectWithValue(error.response?.data?.message);
      }
      rejectWithValue("unknown error");
    }
  }
);
export const userLogin = createAsyncThunk(
  "auth/login",
  async (formdata: z.infer<typeof LoginSchema>, { rejectWithValue }) => {
    try {
      const response = await authInstance.post("/user/Login", formdata, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.log("this is a error :", error.response.data);
      if (error.response && error.response.data) {
        rejectWithValue(error.response?.data);
      }
      rejectWithValue("unknown error");
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
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.Loading = false;
    });
    builder.addCase(userSignUp.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(userSignUp.rejected, (state) => {
      state.Loading = false;
    });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;

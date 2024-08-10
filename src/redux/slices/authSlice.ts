import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authInstance } from "@/helper/axiosInstance";
import { z } from "zod";
import LoginSchema from "@/schema/authSchema/Login";
import { AuthState, User } from "@/types/Authstate";
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
};
const initialState: AuthState = {
  Loading: false,
  userInfo: LoadData(),
};
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

      // rejectWithValue()
      throw error;
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
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;

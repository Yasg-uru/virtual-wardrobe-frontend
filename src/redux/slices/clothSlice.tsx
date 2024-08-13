import { clothInstance } from "@/helper/axiosInstance";
import clothSchema from "@/schema/clothschema/createCloth";
import { clothState, IClothItem } from "@/types/clothState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { z } from "zod";

const savedata = (cloths: IClothItem[]) => {
  sessionStorage.setItem("cloths", JSON.stringify(cloths));
};
const LoadData = (): IClothItem[] => {
  const data = sessionStorage.getItem("cloths");
  if (data) {
    const parsedData = JSON.parse(data);
    return parsedData;
  }
  return [];
};

const initialState: clothState = {
  recommandedCloths: LoadData() || [],
  isLoading: false,
  collections: [],
};
export const WearCloth = createAsyncThunk(
  "cloths/wear",
  async (params: { condition: string; id: string }, { rejectWithValue }) => {
    try {
      const { condition, id } = params;
      const response = await clothInstance.post(
        `/cloth/wear/${id}`,
        { condition },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        rejectWithValue(error.response?.data?.message);
      }
      rejectWithValue("Unkown error");
    }
  }
);
export const AddUserCloth = createAsyncThunk(
  "cloth/AddCloth",
  async (formData: z.infer<typeof clothSchema>, { rejectWithValue }) => {
    try {
      console.log("this is a formdata: ", formData);
      const response = await clothInstance.post("/cloth/create", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        rejectWithValue(error.response?.data?.message);
      }
      rejectWithValue("Unkown error");
    }
  }
);
export const GetCollections = createAsyncThunk(
  "cloths/collections",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/cloth/collections",
        {
          withCredentials: true,
        }
      );
      console.log("this is a response data :", response.data);
      return response.data;
    } catch (error: any) {
      // if (error.response && error.response.data) {
      //   rejectWithValue(error.response?.data?.message);
      // }
      // rejectWithValue("Unkown error");
      throw error;
    }
  }
);
export const filterCloth = createAsyncThunk(
  "cloths/filter",
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await clothInstance.get(`/cloth/filter`, {
        params: formData,
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        rejectWithValue(error.response.data?.message);
      }
      rejectWithValue("unkown error");
    }
  }
);
export const GetRecommandedCloths = createAsyncThunk(
  "cloths/Recommanded",
  async (params: { lat: number; lon: number }, { rejectWithValue }) => {
    try {
      const { lat, lon } = params;
      console.log("this is a lat and lon :", lat, lon);

      const response = await clothInstance.get(
        `/cloth/?lat=${lat}&lon=${lon}`,
        {
          withCredentials: true,
        }
      );
      console.log("this is a response data :", response.data);

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        rejectWithValue(error.response?.data?.message);
      }
      rejectWithValue("unkown error");
    }
  }
);

const clothSlice = createSlice({
  name: "cloth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetRecommandedCloths.fulfilled, (state, action) => {
      state.recommandedCloths = action.payload.sustainableCloths;
      state.isLoading = false;
      savedata(state.recommandedCloths);

      console.log("this is a recommanded cloths :", state.recommandedCloths);
    });
    builder.addCase(GetRecommandedCloths.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetRecommandedCloths.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetCollections.fulfilled, (state, action) => {
      state.collections = action.payload?.Collections;
      state.isLoading = false;
    });
    builder.addCase(GetCollections.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetCollections.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(filterCloth.fulfilled, (state, action) => {
      state.collections = action.payload?.results;
      state.isLoading = false;
    });
    builder.addCase(filterCloth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(filterCloth.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const {} = clothSlice.actions;
export default clothSlice.reducer;

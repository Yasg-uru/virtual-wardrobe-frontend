import { clothInstance } from "@/helper/axiosInstance";
import { clothState, IClothItem } from "@/types/clothState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  },
});
export const {} = clothSlice.actions;
export default clothSlice.reducer;

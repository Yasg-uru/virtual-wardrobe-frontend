import { authInstance, clothInstance } from "@/helper/axiosInstance";
import {
  Formdata,
  SeasonSuitability,
  WeatherSuitability,
} from "@/pages/Cloths/AddCloth";
import clothSchema from "@/schema/clothschema/createCloth";
import { clothState, IClothItem } from "@/types/clothState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { z } from "zod";

const savedata = (cloths: IClothItem[]) => {
  sessionStorage.setItem("cloths", JSON.stringify(cloths));
};
const saveSearchData = (cloths: IClothItem[]) => {
  sessionStorage.setItem("search", JSON.stringify(cloths));
};
const LoadSearchResults = (): IClothItem[] => {
  const data = sessionStorage.getItem("search");
  if (data) {
    const parsedData = JSON.parse(data);
    return parsedData;
  }
  return [];
};
const LoadData = (): IClothItem[] => {
  const data = sessionStorage.getItem("cloths");
  if (data) {
    const parsedData = JSON.parse(data);
    return parsedData;
  }
  return [];
};
const LoadleastmostWorn = (): {
  leastworn: IClothItem[];
  mostworn: IClothItem[];
  underutilized: IClothItem[];
} => {
  const leastData = sessionStorage.getItem("least");
  const mostData = sessionStorage.getItem("most");
  const underUtilizedCloths = sessionStorage.getItem("underutilized");
  if (leastData && mostData && underUtilizedCloths) {
    const leastworn = JSON.parse(leastData);
    const mostworn = JSON.parse(mostData);
    const underutilized = JSON.parse(underUtilizedCloths);
    return { leastworn, mostworn, underutilized };
  }
  return { leastworn: [], mostworn: [], underutilized: [] };
};
const saveAnalysis = (
  learstWorn: IClothItem[],
  mostWorn: IClothItem[],
  underutilized: IClothItem[]
): void => {
  sessionStorage.setItem("least", JSON.stringify(learstWorn));
  sessionStorage.setItem("most", JSON.stringify(mostWorn));
  sessionStorage.setItem("underutilized", JSON.stringify(underutilized));
};

const initialState: clothState = {
  recommandedCloths: LoadData() || [],
  isLoading: false,
  collections: [],
  searchResults: LoadSearchResults() || [],
  leastWorn: LoadleastmostWorn().leastworn || [],
  mostworn: LoadleastmostWorn().mostworn || [],
  underUtilizedCloths: LoadleastmostWorn().underutilized || [],
  Notification: null,
  ClothInfo: null,
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
  async (formData: Formdata, { rejectWithValue }) => {
    try {
      const formDataToSend = new FormData();

      // Append image file
      if (formData.imageurl) {
        formDataToSend.append("imageurl", formData.imageurl);
      }

      // Append the date as a string (if present)
      if (formData.purchaseDate) {
        formDataToSend.append(
          "purchaseDate",
          formData.purchaseDate.toISOString()
        );
      }

      // Append other form fields
      formDataToSend.append("category", formData.category);
      formDataToSend.append("size", formData.size);
      formDataToSend.append("brand", formData.brand);

      formDataToSend.append("material", formData.material);
      formDataToSend.append("color", formData.color);
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("cost", formData.cost.toString());
      formDataToSend.append("isFavorite", formData.isFavorite.toString());
      formDataToSend.append("isArchived", formData.isArchived.toString());

      // Append season suitability
      // Object.keys(formData.seasonSuitability).forEach((key) => {
      //   formDataToSend.append(
      //     `seasonSuitability.${key}`,
      //     formData.seasonSuitability[key as keyof SeasonSuitability].toString()
      //   );
      // });

      // Append weather suitability
      // Object.keys(formData.weatherSuitability).forEach((key) => {
      //   formDataToSend.append(
      //     `weatherSuitability.${key}`,
      //     formData.weatherSuitability[
      //       key as keyof WeatherSuitability
      //     ].toString()
      //   );
      // });
      formDataToSend.append(
        "seasonSuitability",
        JSON.stringify(formData.seasonSuitability)
      );
      formDataToSend.append(
        "weatherSuitability",
        JSON.stringify(formData.weatherSuitability)
      );

      console.log("this is a formdata: ", formData);
      const response = await clothInstance.post(
        "/cloth/create",
        formDataToSend,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      console.log("this is a error :", error);

      // if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
      // }
      // return rejectWithValue("Unkown error");
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
      console.log("this is a error :", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("unkown error");
    }
  }
);
export const SearchCloths = createAsyncThunk(
  "cloths/search",
  async (params: { searchQuery: string }, { rejectWithValue }) => {
    try {
      const { searchQuery } = params;
      const response = await clothInstance.get(
        `/cloth/search?searchQuery=${searchQuery}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      console.log("this is a error:", AxiosError);
      return rejectWithValue(error.response.data.message);
      // rejectWithValue("unkown error ");
    }
  }
);
export const GetClothDetails = createAsyncThunk(
  "auth/ClothDetails",
  async (params: { id: string }, { rejectWithValue }) => {
    try {
      const response = await clothInstance.get(`/cloth/details/${params.id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
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
      rejectWithValue("unkown error");
    }
  }
);
export const GetWearAnalysis = createAsyncThunk(
  "cloths/wearanlysis",
  async (params: { ex: string }, { rejectWithValue }) => {
    try {
      const response = await clothInstance.get(`/cloth/wear/analysis`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data?.message);
      }
      return rejectWithValue("unkown error");
    }
  }
);
export const GetNotification = createAsyncThunk(
  "cloths/notifications",
  async (params: { ex: string }, { rejectWithValue }) => {
    try {
      const response = await clothInstance.get("/cloth/reminder", {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("unkown error");
    }
  }
);
export const DeleteCloth = createAsyncThunk(
  "cloths/delete",
  async (params: { clothId: string }, { rejectWithValue }) => {
    try {
      const { clothId } = params;
      const response = await clothInstance.delete(`/${clothId}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unkown error");
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
    builder.addCase(SearchCloths.fulfilled, (state, action) => {
      state.searchResults = action.payload?.result;
      saveSearchData(state.searchResults);
    });
    builder.addCase(GetWearAnalysis.fulfilled, (state, action) => {
      const { leastWorn, mostWorn, underUtilizedCloths } =
        action.payload?.wornData;

      state.leastWorn = leastWorn;
      state.mostworn = mostWorn;
      state.underUtilizedCloths = underUtilizedCloths;
      saveAnalysis(state.leastWorn, state.mostworn, state.underUtilizedCloths);
    });
    builder.addCase(GetNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Notification = action.payload;
    });
    builder.addCase(GetNotification.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetNotification.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(AddUserCloth.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(AddUserCloth.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(AddUserCloth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetClothDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetClothDetails.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetClothDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ClothInfo = action.payload?.cloth;
    });
  },
});
export const {} = clothSlice.actions;
export default clothSlice.reducer;

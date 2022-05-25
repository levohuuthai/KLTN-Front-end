import authAPI from "api/authAPI";
import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signinGoogle = createAsyncThunk(
  "auth/add_login_google",
  async (payload) => {
    const data = await authAPI.add_login_google(payload);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    Cookies.set("token", data.data.accessToken);
    Cookies.set("refreshToken", data.data.refreshToken);
    console.log(data.data);
    return data.data.user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")),
  },
  reducers: {},
  extraReducers: {
    [signinGoogle.fulfilled]: (state, action) => {
      state.current = action.payload; //update trên store
    },
  },
});

const { reducer } = userSlice;
export default reducer;

import authAPI from "../../../../api/authAPI";
import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signin = createAsyncThunk("auth/signin", async (payload) => {
  const data = await authAPI.signIn(payload);
  localStorage.setItem("user", JSON.stringify(data.data.user));
  Cookies.set("token", data.data.accessToken);
  Cookies.set("refreshToken", data.data.refreshToken);
  console.log(data.data);
  return data.data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")),
  },
  reducers: {},
  extraReducers: {
    [signin.fulfilled]: (state, action) => {
      state.current = action.payload; //update trên store
    },
  },
});

const { reducer } = userSlice;
export default reducer;

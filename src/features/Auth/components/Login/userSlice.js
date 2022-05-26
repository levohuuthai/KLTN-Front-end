import authAPI from "../../../../api/authAPI";
import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const signin = createAsyncThunk("auth/signin", async (payload) => {
  const data = await authAPI.signIn(payload);
  console.log(data.data.user);
  if (data.data.user.active === true) {
    localStorage.setItem("user", JSON.stringify(data.data.user));
    Cookies.set("token", data.data.accessToken);
    Cookies.set("refreshToken", data.data.refreshToken);
    return data.data.user;
  } else {
    return toast.error("Tài khoản của bạn đã bị khóa", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
  }
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

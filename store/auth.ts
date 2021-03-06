import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { AuthState } from "../types/reduxState";

const initialState: AuthState = {
  authMode: "signup",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // * 인증 팝업 변경하기
    setAuthMode(state: AuthState, action: PayloadAction<"signup" | "login">) {
      state.authMode = action.payload;
    },
  },
});

export const authActions = { ...auth.actions };

export default auth;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/user.d";
import { UserState } from "../types/reduxState";

// * initial state
const initialState: UserState = {
  id: 0,
  email: "",
  lastname: "",
  firstname: "",
  birthday: "",
  isLogged: false,
  profileImage: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    // * changed login user
    setLoggedUser(state, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true };
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;

import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { RoomState } from "../types/reduxState";
import { RoomType } from "../types/room";

// * 초기상태
const initialState: RoomState = {
  rooms: [],
};

const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state: RoomState, action: PayloadAction<RoomType[]>) {
      state.rooms = action.payload;
    },
  },
});

export const roomActions = { ...room.actions };

export default room;

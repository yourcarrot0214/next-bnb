import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { RoomState } from "../types/reduxState";
import { RoomType } from "../types/room";

// * 초기상태
const initialState: RoomState = {
  rooms: [],
  detail: null,
};

const host = createSlice({
  name: "host",
  initialState,
  reducers: {
    setHostingRooms(state: RoomState, action: PayloadAction<RoomType[]>) {
      state.rooms = action.payload;
    },
    setDetailRoom(state: RoomState, action: PayloadAction<RoomType>) {
      state.detail = action.payload;
    },
  },
});

export const hostActions = { ...host.actions };

export default host;

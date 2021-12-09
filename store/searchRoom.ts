import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { SearchRoomState } from "../types/reduxState";

const initialState: SearchRoomState = {
  location: "",
  latitude: 0,
  longitude: 0,
  checkInDate: null,
  checkOutDate: null,
  adultCount: 1,
  childrenCount: 0,
  infantsCount: 0,
};

const searchRoom = createSlice({
  name: "searchRoom",
  initialState,
  reducers: {
    // * 위치 변경하기
    setLocation(state: SearchRoomState, action: PayloadAction<string>) {
      state.location = action.payload;
      return state;
    },
    // * 위도 설정하기
    setLatitude(state: SearchRoomState, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    // * 경도 설정하기
    setLongitude(state: SearchRoomState, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
    // * 체크인 날짜 변경하기
    setCheckInDate(
      state: SearchRoomState,
      action: PayloadAction<string | null>
    ) {
      state.checkInDate = action.payload;
      return state;
    },
    // * 체크아웃 날짜 변경하기
    setCheckOutDate(
      state: SearchRoomState,
      action: PayloadAction<string | null>
    ) {
      state.checkOutDate = action.payload;
      return state;
    },
    // * 성인 수 변경하기
    setAdultCount(state: SearchRoomState, action: PayloadAction<number>) {
      state.adultCount = action.payload;
      return state;
    },
    // * 어린이 수 변경하기
    setChildrenCount(state: SearchRoomState, action: PayloadAction<number>) {
      state.childrenCount = action.payload;
      return state;
    },
    // * 유아 수 변경하기
    setInfantsCount(state: SearchRoomState, action: PayloadAction<number>) {
      state.infantsCount = action.payload;
      return state;
    },
  },
});

export const searchRoomActions = { ...searchRoom.actions };

export default searchRoom;

import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { BedType } from "../types/room";

type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
};

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null,
  // * 최대 숙박 인원
  maximumGuestCount: 1,
  // * 침실 개수
  bedroomCount: 0,
  // * 침대 개수
  bedCount: 1,
  // * 침대 유형
  bedList: [],
  // * 공용공간 침대 유형
  publicBedList: [],
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {
    // * 큰 건물 유형
    setLargeBuildingType(
      state: RegisterRoomState,
      action: PayloadAction<string>
    ) {
      if (action.payload === "") {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },
    // * 건물 유형 변경하기
    setBuildingType(state: RegisterRoomState, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },
    // * 숙소 유형 변경하기
    setRoomType(
      state: RegisterRoomState,
      action: PayloadAction<"entire" | "private" | "public">
    ) {
      state.roomType = action.payload;
      return state;
    },
    // * 게스트용 숙소 여부 변경하기
    setIsSetUpForGuest(
      state: RegisterRoomState,
      action: PayloadAction<boolean>
    ) {
      state.isSetUpForGuest = action.payload;
      return state;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;

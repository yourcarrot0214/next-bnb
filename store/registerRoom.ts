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
    // * 최대 숙박 인원 변경하기
    setMaximumGuestCount(
      state: RegisterRoomState,
      action: PayloadAction<number>
    ) {
      state.maximumGuestCount = action.payload;
      return state;
    },
    // * 침실 개수 변경하기
    setBedroomCount(state: RegisterRoomState, action: PayloadAction<number>) {
      const bedroomCount = action.payload;
      let { bedList } = state;

      state.bedroomCount = bedroomCount;

      if (bedroomCount < bedList.length) {
        // * 기존 침대 개수가 더 많으면 초과 부분 잘라내기
        bedList = state.bedList.slice(0, bedroomCount);
      } else {
        //  * 변경될 침대 개수가 더 많으면 나머지 침실 채우기
        for (let i = bedList.length + 1; i < bedroomCount + 1; i += 1) {
          bedList.push({ id: i, beds: [] });
        }
      }
      state.bedList = bedList;

      return state;
    },
    // * 최대 침대 개수 변경하기
    setBedCount(state: RegisterRoomState, action: PayloadAction<number>) {
      state.bedCount = action.payload;
      return state;
    },
    // * 침대 유형 개수 변경하기
    setBedTypeCount(
      state: RegisterRoomState,
      action: PayloadAction<{ bedroomId: number; type: BedType; count: number }>
    ) {
      const { bedroomId, type, count } = action.payload;
      const bedroom = state.bedList[bedroomId - 1];
      const prevBeds = bedroom.beds;
      const index = prevBeds.findIndex((bed) => bed.type === type);
      if (index === -1) {
        // * 타입이 없다면
        state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
        return state;
      }
      // * 타입이 존재한다면
      if (count === 0) {
        state.bedList[bedroomId - 1].beds.splice(index, 1);
      } else {
        state.bedList[bedroomId - 1].beds[index].count = count;
      }
      return state;
    },
    // * 공용공간 침대 유형 개수 변경하기
    setPublicBedTypeCount(
      state: RegisterRoomState,
      action: PayloadAction<{ type: BedType; count: number }>
    ) {
      const { type, count } = action.payload;

      const index = state.publicBedList.findIndex((bed) => bed.type === type);
      if (index === -1) {
        // * 타입이 없다면
        state.publicBedList = [...state.publicBedList, { type, count }];
        return state;
      }
      // * 타입이 존재 한다면
      if (count === 0) {
        state.publicBedList.splice(index, 1);
      } else {
        state.publicBedList[index].count = count;
      }
      return state;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;

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
  bathroomCount: number;
  bathroomType: "private" | "public" | null;
  // 숙소 위치 등록하기
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  // 편의시설
  amentities: string[];
  // 편의공간
  conveniences: string[];
  // 숙소사진
  photos: string[];
  // 숙소 설명
  description: string;
  // 숙소 이름
  title: string;
  // 숙소 요금
  price: number;
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
  // * 욕실 개수
  bathroomCount: 1,
  // * 욕실 유형
  bathroomType: null,
  // * 국가/지역
  country: "",
  // * 시/도
  city: "",
  // * 시/군/구
  district: "",
  // * 도로명주소
  streetAddress: "",
  // * 동호수
  detailAddress: "",
  // * 우편번호
  postcode: "",
  // * 위도
  latitude: 0,
  // * 경도
  longitude: 0,
  // * 편의시설
  amentities: [],
  // * 편의공간
  conveniences: [],
  // * 숙소사진
  photos: [],
  // * 숙소이름
  title: "",
  // * 숙소 요금
  price: 0,
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
    // * 욕실 개수 변경하기
    setBathroomCount(state: RegisterRoomState, action: PayloadAction<number>) {
      state.bathroomCount = action.payload;
      return state;
    },
    // * 욕실 유형 변경하기
    setBathroomType(
      state: RegisterRoomState,
      action: PayloadAction<"private" | "public">
    ) {
      state.bathroomType = action.payload;
      return state;
    },
    // * 국가 변경하기
    setCountry(state: RegisterRoomState, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    // * 시/도 변경하기
    setCity(state: RegisterRoomState, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    // * 시/군/구 변경하기
    setDistrict(state: RegisterRoomState, action: PayloadAction<string>) {
      state.district = action.payload;
    },
    //  * 도로명주소 변경하기
    setStreetAddress(state: RegisterRoomState, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
    },
    // * 동호수 변경하기
    setDetailAddress(state: RegisterRoomState, action: PayloadAction<string>) {
      state.detailAddress = action.payload;
    },
    // * 우편번호 변경하기
    setPostcode(state: RegisterRoomState, action: PayloadAction<string>) {
      state.postcode = action.payload;
    },
    // * 위도 변경하기
    setLatitude(state: RegisterRoomState, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    // * 경도 변경하기
    setLongitude(state: RegisterRoomState, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
    // * 편의시설 변경하기
    setAmentities(state: RegisterRoomState, action: PayloadAction<string[]>) {
      state.amentities = action.payload;
    },
    // * 편의공간 변경하기
    setConveniences(state: RegisterRoomState, action: PayloadAction<string[]>) {
      state.conveniences = action.payload;
    },
    // * 숙소사진 변경하기
    setPhotos(state: RegisterRoomState, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    },
    // * 숙소 설명 변경하기
    setDescription(state: RegisterRoomState, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    // * 숙소 이름 변경하기
    setTitle(state: RegisterRoomState, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    // * 숙소 요금 변경하기
    setPrice(state: RegisterRoomState, action: PayloadAction<number>) {
      state.price = action.payload;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;

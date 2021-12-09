import { UserType } from "./user.d";
import { BedType } from "./room.d";
// * user redux state
export type UserState = UserType & {
  isLogged: boolean;
};

// * common redux state
export type CommonState = {
  validateMode: boolean;
};

// * auth redux state
export type AuthState = {
  authMode: "signup" | "login";
};

export type RegisterRoomState = {
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
  // 예약 시작 날짜
  startDate: string | null;
  // 예약 종료 날짜
  endDate: string | null;
};

// * 숙소 검색 redux state type
export type SearchRoomState = {
  location: string;
  latitude: number;
  longitude: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  adultCount: number;
  childrenCount: number;
  infantsCount: number;
};

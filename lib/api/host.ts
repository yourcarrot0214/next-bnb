import axios from ".";
import { RoomType } from "../../types/room";
import { makeQueryString } from "../utils";

// * 호스팅 숙소 리스트 불러오기
export const getHostRoomListAPI = (
  userId: Object & { [key: string]: string | string[] | undefined }
) => {
  return axios.get<RoomType[]>(makeQueryString("/api/host", userId));
};

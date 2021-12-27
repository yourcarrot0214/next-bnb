import { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "lodash/isEmpty";
import { StoredRoomType } from "../../../types/room";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { userId } = req.query;
    console.log("api/host/index", req.query);

    try {
      const rooms = Data.room.getList();
      const filteredRooms = rooms.filter(
        (room) => room.hostId === Number(userId)
      );
      console.log(filteredRooms.length);
      res.statusCode = 200;
      return res.send(filteredRooms);
      // // * filtered room by location
      // const filteredRooms = rooms.filter((room) => {
      //   if (latitude && latitude !== "0" && longitude && longitude !== "0") {
      //     if (
      //       !(
      //         Number(latitude) - 0.5 < room.latitude &&
      //         room.latitude < Number(latitude) + 0.05 &&
      //         Number(longitude) - 0.5 < room.longitude &&
      //         room.longitude < Number(longitude) + 0.05
      //       )
      //     ) {
      //       return false;
      //     }
      //   }
      //   if (checkInDate) {
      //     if (
      //       new Date(checkInDate as string) < new Date(room.startDate) ||
      //       new Date(checkInDate as string) > new Date(room.endDate)
      //     ) {
      //       return false;
      //     }
      //   }
      //   if (checkOutDate) {
      //     if (
      //       new Date(checkOutDate as string) < new Date(room.startDate) ||
      //       new Date(checkOutDate as string) > new Date(room.endDate)
      //     ) {
      //       return false;
      //     }
      //   }
      //   if (
      //     room.maximumGuestCount <
      //     Number(adultCount as string) +
      //       (Number(childrenCount as string) * 0.5 || 0)
      //   ) {
      //     return false;
      //   }
      //   return true;
      // });
      // const limitedRooms = filteredRooms.splice(
      //   0 + (Number(page) - 1) * Number(limit),
      //   Number(limit)
      // );
      // const roomsWithHost = await Promise.all(
      //   limitedRooms.map(async (room) => {
      //     const host = await Data.user.find({ id: room.hostId });
      //     return { ...room, host };
      //   })
      // );
      // res.statusCode = 200;
      // return res.send(roomsWithHost);
    } catch (error) {
      console.log(error);
    }
  }

  res.statusCode = 405;

  return res.end();
};

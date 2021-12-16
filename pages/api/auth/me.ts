import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";
import axios from "../../../lib/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(":: meAPI ::");
  if (req.method === "GET") {
    try {
      // ! req.headers에 cookie가 없으므로 axios header의 cookie값으로 대체
      const accessToken = axios.defaults.headers.cookie;
      if (!accessToken) {
        res.statusCode = 400;
        return res.send("access_token이 없습니다.");
      }
      const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);
      const user = Data.user.find({ id: Number(userId) });
      if (!user) {
        res.statusCode = 404;
        return res.send("해당 유저가 없습니다.");
      }

      const userWithoutPassword: Partial<Pick<
        StoredUserType,
        "password"
      >> = user;
      delete userWithoutPassword.password;

      res.statusCode = 200;
      console.log("meAPI :: ", userWithoutPassword);
      return res.send(userWithoutPassword);
    } catch (error) {
      console.log("meAPI error : ", error);
      res.statusCode = 500;
      return res.send(error);
    }
  }

  res.statusCode = 405;
  return res.end();
};

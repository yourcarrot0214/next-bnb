import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // * 2. request body check
      const { email, password } = req.body;
      if (!email || !password) {
        res.statusCode = 400;
        return res.send("필수 데이터가 없습니다.");
      }

      // * 3. user check in database
      const user = Data.user.find(email);
      if (!user) {
        res.statusCode = 400;
        return res.send("이메일 주소에 해당하는 유저가 없습니다.");
      }

      // * 4. user password check
      const isPasswordMatched = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatched) {
        res.statusCode = 403;
        return res.send("비밀번호가 일치하지 않습니다.");
      }

      // * 5. create token
      const token = jwt.sign(String(user.id), process.env.JWT_SCERET!);
      // * 6 cookie header setup
      res.setHeader(
        "Set-Cookie",
        `access_token=${token}; path=/; expires=${new Date(
          Date.now() + 60 * 60 * 1000 * 3
        ).toISOString()}; httponly;`
      );

      // * 7. delete user password for response user data
      const userWithoutPassword: Partial<Pick<
        StoredUserType,
        "password"
      >> = user;
      delete userWithoutPassword.password;
      res.statusCode = 200;
      return res.send(user);
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      return res.send(error);
    }
  }
};

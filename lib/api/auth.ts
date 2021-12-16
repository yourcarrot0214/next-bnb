import axios from "axios";
import { UserType } from "../../types/user.d";

// * signup body
interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

// * signup api
export const signupAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>("/api/auth/signup", body);

// * login body
interface LoginAPIBody {
  email: string;
  password: string;
}

// * login api
export const loginAPI = (body: LoginAPIBody) =>
  axios.post<UserType>("/api/auth/login", body);

// * cookie의 access_token의 유저 정보를 받아오는 api
export const meAPI = () =>
  axios.get<UserType>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`);

// * logout api
export const logoutAPI = () => axios.delete("/api/auth/logout");

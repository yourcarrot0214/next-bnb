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
  axios.post<UserType>("api/auth/login", body);

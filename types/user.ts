// * data/user.json에 저장될 유저 타입
export type StoredUserType = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage: string;
};

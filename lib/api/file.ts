import axios from ".";

// * file upload api
export const uploadFileAPI = (file: FormData) =>
  axios.post("/api/files/upload", file);

import axios from "axios";

export interface User {
  username: string;
  email: string;
}

export interface ApiError {
  status: number;
  message: string;
}

export const postSignUp = (
  username: string,
  email: string,
  password: string
) => {
  return (
    axios.post("api/users",
    {
      username,
      email,
      password,
    }
  ));
};

export const postSignIn = (username: string, password: string) => {
  return axios.post("/api/auth/:username", { username, password });
};
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

export const getUsers = (): User[] => {
  return [
    { username: "Bill", email: "tony@gmail.com" },
    { username: "Jabrony", email: "bill@gmail.com" },
    { username: "Dom", email: "george@gmail.com" },
  ];
  // return axios.get(``);
};

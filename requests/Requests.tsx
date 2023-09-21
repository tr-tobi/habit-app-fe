import axios from "axios";

export const postSignIn = (username: string, password: string) => {
  return axios.post("https://your-backend-url.com/signin", {
    username,
    password,
  });
};

export interface User {
  username: string;
  email: string;
}

export interface ApiError {
  status: number;
  message: string;
}

export const getUsers = (): User[] => {
  return [
    { username: "Bill", email: "tony@gmail.com" },
    { username: "Jabrony", email: "bill@gmail.com" },
    { username: "Dom", email: "george@gmail.com" },
  ];
  // return axios.get(`https://your-backend-url.com/api/user/${userName}`);
};

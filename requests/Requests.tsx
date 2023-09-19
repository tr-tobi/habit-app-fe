import axios from "axios";

export const postSignUp = (
  username: string,
  email: string,
  password: string
) => {
  return axios.post("https://your-backend-url.com/signup", {
    username,
    email,
    password,
  });
};

export const postSignIn = (username: string, password: string) => {
  return axios.post("https://your-backend-url.com/signin", {
    username,
    password,
  });
};

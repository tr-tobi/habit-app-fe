import axios from "axios";

import {HOST_URL} from '@env'

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

interface NewHabit {
  habit_name: string
  habit_category: string,
  description: string,
  occurrence: string[],
}

export const postHabit = (username: string, newHabit: NewHabit) => {
  return axios.post(`${HOST_URL}/api/users/${username}/habits`, newHabit)
    .then(({data}) => data.habit)
}

interface NewHabitCompletion {
  habit_id: string
  username: string,
  completed: boolean,
}

export const postHabitCompletion = (username: string, newHabitCompletion: NewHabitCompletion) => {
  return axios.post(`${HOST_URL}/api/users/${username}/habit_completion`, newHabitCompletion)
    .then(({data}) => data.habit)
}
import axios from "axios";
import bcrypt from "bcrypt";

export const postSignUp = async (
  username: string,
  email: string,
  password: string
): Promise<any> => {

  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return axios.post("https://your-backend-url.com/signup", {
    username,
    email,
    password: hashedPassword, 
  });
};

export const postSignIn = async (
  username: string,
  password: string
): Promise<any> => {
  const response = await axios.get(
    `https://your-backend-url.com/users/${username}`
  );
  const hashedPasswordFromBackend = response.data.hashedPassword;
  const passwordMatch = await bcrypt.compare(
    password,
    hashedPasswordFromBackend
  );
  if (passwordMatch) {
    return { success: true };
  } else {
    return { success: false };
  }
};

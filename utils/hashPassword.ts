import * as Crypto from "expo-crypto";

export const hashPassword = async (password: string) => {
  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA512,
    password
  );
  return hashedPassword;
};

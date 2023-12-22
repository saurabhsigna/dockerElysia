import { httpError } from "../../helpers/HTTPError";

export const hashPassword = async (password: string) => {
  const hashed_password = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 10,
  });

  return hashed_password;
};

export const comparePassword = async (
  password: string,
  hashed_password: string,
  set: any,
) => {
  const isMatch = await Bun.password.verify(password, hashed_password);
  if (!isMatch) throw new httpError(400, "password not match", set).default();
};

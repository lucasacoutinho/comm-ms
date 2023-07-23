import bcrypt from "bcrypt";

export const hash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const compare = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

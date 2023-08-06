import { User } from "../entity/User";
import { UserException } from "../exception";
import { UserRepository } from "../repository";
import HttpStatusCode from "../enum/HttpStatusCode";

const findById = async (id: number): Promise<User> => {
  const user = await UserRepository.findById(id);
  if (!user) {
    throw new UserException("User not found.", HttpStatusCode.NOT_FOUND);
  }
  return user;
};

const findByEmail = async (email: string): Promise<User> => {
  const user = await UserRepository.findByEmail(email);
  if (!user) {
    throw new UserException("User not found.", HttpStatusCode.NOT_FOUND);
  }
  return user;
};

const create = async (data: User): Promise<User> => {
  const user = await UserRepository.findByEmail(data.email);
  if (user) {
    throw new UserException("User already exists.", HttpStatusCode.BAD_REQUEST);
  }
  return UserRepository.create(data);
};

export default { findById, findByEmail, create };

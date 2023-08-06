import { AppDataSource } from "../config/database";
import { User } from "../entity/User";

const repo = AppDataSource.getRepository(User);

const findById = async (id: number): Promise<User | null> => {
  return repo.findOne({
    where: { id: id }
  });
};

const findByEmail = async (email: string): Promise<User | null> => {
  return repo.findOne({
    where: { email: email }
  });
};

const create = async (data: User): Promise<User> => {
  return repo.save(data);
};

export default { findById, findByEmail, create };

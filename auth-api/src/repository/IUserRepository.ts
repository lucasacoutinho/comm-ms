import { User } from "../entity/User";
import IRepository from "./IRepository";

export default interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}

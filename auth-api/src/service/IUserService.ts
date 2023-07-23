import { User } from "../entity/User";

export default interface IUserService {
  create(data: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: number): Promise<User>;
}

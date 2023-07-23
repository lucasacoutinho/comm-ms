import { User } from "../entity/User";
import UserException from "../exception/UserException";
import IUserRepository from "../repository/IUserRepository";
import UserRepository from "../repository/UserRepository";
import HttpStatusCode from "../enum/HttpStatusCode";
import IUserService from "./IUserService";

class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserException("User not found.", HttpStatusCode.NOT_FOUND);
    }
    return user;
  }

  async create(data: User): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) {
      throw new UserException("User already exists.", HttpStatusCode.BAD_REQUEST);
    }
    return this.userRepository.create(data);
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserException("User not found.", HttpStatusCode.NOT_FOUND);
    }
    return user;
  }
}

export default new UserService(UserRepository);

import { AppDataSource } from "../config/database";
import { User } from "../entity/User";
import { Repository } from "typeorm";
import IUserRepository from "./IUserRepository";

class UserRepository implements IUserRepository {
  private _model: Repository<User>;

  constructor(model: Repository<User>) {
    this._model = model;
  }

  async findAll(): Promise<User[]> {
    return this._model.find();
  }

  async findById(id: number): Promise<User | null> {
    return this._model.findOne({
      where: { id: id }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this._model.findOne({
      where: { email: email }
    });
  }

  async create(data: User): Promise<User> {
    return this._model.save(data);
  }

  async update(id: number, data: User): Promise<User | null> {
    await this._model.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this._model.delete(id);
    return result.affected === 1;
  }
}

export default new UserRepository(AppDataSource.getRepository(User));

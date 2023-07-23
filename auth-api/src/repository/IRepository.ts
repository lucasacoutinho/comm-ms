export default interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: number, data: T): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}

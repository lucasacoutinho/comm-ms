import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "email", unique: true })
  email: string;

  @Column({ name: "password" })
  password: string;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "deleted_at", nullable: true })
  deletedAt: Date;
}

import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Order {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ name: "products" })
  products: Product[];

  @Column({ name: "user" })
  user: User;

  @Column({ name: "status", type: "string", nullable: false })
  status: string;

  @Column({ name: "created_at", type: "timestamp", default: new Date() })
  createdAt: Date;

  @Column({ name: "updated_at", type: "timestamp", default: new Date() })
  updatedAt: Date;
}

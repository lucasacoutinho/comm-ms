import { Column, Entity } from "typeorm";

@Entity()
export class User {
  @Column({ name: "user_id", type: "number", nullable: false })
  id: number;
}

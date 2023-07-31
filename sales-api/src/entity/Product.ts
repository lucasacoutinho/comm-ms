import { Column, Entity } from "typeorm";

@Entity()
export class Product {
  @Column({ name: "product_id", type: "number", nullable: false })
  id: number;
  @Column({ name: "quantity", type: "number", nullable: false })
  quantity: number;
}

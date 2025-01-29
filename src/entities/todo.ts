import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType() 
@Entity() 
export class Todo {
  @Field(() => ID) 
    @PrimaryGeneratedColumn("uuid") // Database primary key
    id!: string;

  @Field() // GraphQL field
    @Column()
    title!: string;

  @Field({ nullable: true }) // GraphQL field
  @Column({ nullable: true })
  description?: string;

  @Field() // GraphQL field
    @Column({ default: "pending" })
    status!: string;
}

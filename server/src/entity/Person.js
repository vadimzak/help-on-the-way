import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export default class Person {

    @PrimaryGeneratedColumn()
    id = undefined;

    @Column("varchar")
    firstName = undefined;

    @Column("varchar")
    lastName = undefined;
}
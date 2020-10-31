import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Author} from "../authors/author.entity";


@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => Author, author => author.books)
    author: Author;
}
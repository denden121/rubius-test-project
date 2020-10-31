import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookDTO } from './book.dto';
import { UpdateResult, DeleteResult } from  'typeorm';
import { Author } from '../authors/author.entity';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        private authorsService: AuthorsService,
    ) { }

    async findAll(): Promise<Book[]> {
        return await this.bookRepository.find({ relations: ["author"] });
    }

    async findOneBook(id: number): Promise<Book> {
        return await this.bookRepository.findOne({ where: { id }, relations: ["author"] });
    }

    async create(book: BookDTO): Promise<Book> {
        let auth = new Author();
        auth = await this.authorsService.findOneAuthor(book.authorID);
        let newBook = new Book();
        delete book.authorID;
        newBook = {
            ...book,
            author: auth
        };
        return await this.bookRepository.save(newBook);
    }

    async update(book: BookDTO): Promise<UpdateResult> {
        if (book.authorID) {
            let auth = new Author();
            let newBook = new Book();
            
            auth = await this.authorsService.findOneAuthor(book.authorID);
            delete book.authorID;
            newBook = {
                ...book,
                author: auth
            };
            return await this.bookRepository.update(newBook.id, newBook);
        } else {
            return await this.bookRepository.update(book.id, book);
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.bookRepository.delete(id);
    }
}

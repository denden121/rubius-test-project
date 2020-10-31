import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private authorRepository: Repository<Author>
    ) { }

    async findAll(): Promise<Author[]> {
        return await this.authorRepository.find();
    }

    async findOneAuthor(id: number): Promise<Author> {
        return await this.authorRepository.findOne({ where: { id } });
    }

    async create(author: Author): Promise<Author> {
        return await this.authorRepository.save(author);
    }

    async update(author: Author): Promise<UpdateResult> {
        return await this.authorRepository.update(author.id, author);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.authorRepository.delete(id);
    }
}

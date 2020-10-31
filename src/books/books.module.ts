import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { AuthorsService } from '../authors/authors.service';
import { Author } from 'src/authors/author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    TypeOrmModule.forFeature([Author]),
  ],
  providers: [BooksService, AuthorsService],
  controllers: [BooksController]
})
export class BooksModule {}

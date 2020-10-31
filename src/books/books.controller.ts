import { Controller, Get } from '@nestjs/common';
import { Book } from './book.entity';
import { BookDTO } from './book.dto';
import { BooksService } from './books.service';
import { Post, Put, Delete, Body, Param } from  '@nestjs/common';


@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService){}

    @Get()
    index(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: number): Promise<any> {
        return this.booksService.findOneBook(id);
    }

    @Post('create')
    async create(@Body() bookData: BookDTO): Promise<any> {
      return this.booksService.create(bookData);
    }

    @Put(':id/update')
    async update(@Param('id') id: number, @Body() bookData: Book): Promise<any> {
        bookData.id = Number(id);
        return this.booksService.update(bookData);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id: number): Promise<any> {
      return this.booksService.delete(id);
    }      
}

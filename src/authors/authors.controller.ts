import { Controller, Get } from '@nestjs/common';
import { Author } from './author.entity';
import { AuthorsService } from './authors.service';
import { Post, Put, Delete, Body, Param } from  '@nestjs/common';

@Controller('authors')
export class AuthorsController {
    constructor(private authorsService: AuthorsService){}

    @Get()
    index(): Promise<Author[]> {
        return this.authorsService.findAll();
    } 

    @Post('create')
    async create(@Body() authorData: Author): Promise<any> {
      return this.authorsService.create(authorData);
    }

    @Put(':id/update')
    async update(@Param('id') id: number, @Body() authorData: Author): Promise<any> {
        authorData.id = id;
        return this.authorsService.update(authorData);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id: number): Promise<any> {
      return this.authorsService.delete(id);
    }      
}

import { MoviesService } from './movies.service';
import { Controller, Get } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    constructor(private MoviesService: MoviesService) {}
    
    @Get()
    findAll(): string[] {
        return this.MoviesService.findAll();
    }
}

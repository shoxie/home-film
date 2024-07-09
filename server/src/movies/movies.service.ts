import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  private readonly movies: string[] = [];

  findAll(): string[] {
    return [];
  }
}

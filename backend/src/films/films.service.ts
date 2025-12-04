import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { Film } from '../repository/entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAllFilms(): Promise<Film[]> {
    return this.filmsRepository.findAll();
  }

  async getFilmWithSchedule(id: string): Promise<Film | null> {
    return this.filmsRepository.findById(id);
  }
}

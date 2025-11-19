import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/')
  async getAllFilms() {
    const films = await this.filmsService.getAllFilms();
    return { items: films, total: films.length };
  }

  @Get('/:id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    const film = await this.filmsService.getFilmWithSchedule(id);
    if (!film) {
      throw new NotFoundException('Фильм не найден');
    }
    return film;
  }
}

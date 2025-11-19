import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderDto: CreateOrderDto) {
    const { filmId, sessionId, tickets } = orderDto;

    const film = await this.filmsRepository.findById(filmId);
    if (!film) {
      throw new BadRequestException('Фильм не найден');
    }

    const session = film.schedule.find(s => s.id === sessionId);
    if (!session) {
      throw new BadRequestException('Сеанс не найден');
    }

    const newTaken = [...session.taken];

    for (const ticket of tickets) {
      const seatKey = `${ticket.row}:${ticket.seat}`;
      
      if (newTaken.includes(seatKey)) {
        throw new ConflictException(`Место ${ticket.row}:${ticket.seat} уже занято`);
      }
      
      newTaken.push(seatKey);
    }

    await this.filmsRepository.updateSession(filmId, sessionId, newTaken);

    return {
      filmId,
      sessionId,
      tickets,
    };
  }
}

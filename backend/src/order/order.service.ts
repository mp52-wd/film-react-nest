import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderDto: CreateOrderDto) {
    const { tickets } = orderDto;

    const results = [];

    for (const ticket of tickets) {
      const { film: filmId, session: sessionId, row, seat } = ticket;

      const film = await this.filmsRepository.findById(filmId);
      if (!film) {
        throw new BadRequestException('Фильм не найден');
      }

      const session = film.schedule.find((s) => s.id === sessionId);
      if (!session) {
        throw new BadRequestException('Сеанс не найден');
      }

      if (row < 1 || row > session.rows) {
        throw new BadRequestException(`Некорректный номер ряда: ${row}`);
      }

      if (seat < 1 || seat > session.seats) {
        throw new BadRequestException(`Некорректный номер места: ${seat}`);
      }

      const seatKey = `${row}:${seat}`;
      if (session.taken.includes(seatKey)) {
        throw new ConflictException(`Место ${row}:${seat} уже занято`);
      }

      const newTaken = [...session.taken, seatKey];
      await this.filmsRepository.updateSession(filmId, sessionId, newTaken);

      results.push({
        id: `${filmId}-${sessionId}-${row}-${seat}`,
        film: filmId,
        session: sessionId,
        daytime: session.daytime,
        row,
        seat,
        price: session.price,
      });
    }

    return { items: results };
  }
}

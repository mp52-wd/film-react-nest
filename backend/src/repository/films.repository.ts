import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmModel.findOne({ id }).exec();
  }

  async updateSession(
    filmId: string,
    sessionId: string,
    taken: string[],
  ): Promise<Film | null> {
    return this.filmModel
      .findOneAndUpdate(
        { id: filmId, 'schedule.id': sessionId },
        { $set: { 'schedule.$.taken': taken } },
        { new: true },
      )
      .exec();
  }
}

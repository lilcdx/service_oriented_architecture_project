import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Bingo } from './schemas/bingo.schema';

@Injectable()
export class BingoRepository extends AbstractRepository<Bingo> {
  
  protected readonly logger = new Logger(BingoRepository.name);

  constructor(
    @InjectModel(Bingo.name) bingoModel: Model<Bingo>,
    @InjectConnection() connection: Connection,
  ) {
    super(bingoModel, connection);
  }

  async findByUserId(userId: string): Promise<Bingo | null> {
    return this.model.findOne({ userId }).exec(); 
  }
  
}

import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BINGO_CHECK_SERVICE } from './constants/services';
import { CreateBingoRequest } from './dto/create-bingo.request';
import { BingoRepository } from './bingo.repository';
import { Bingo } from './schemas/bingo.schema';

@Injectable()
export class BingoService {
  constructor(
    private readonly bingoRepository: BingoRepository,
    @Inject(BINGO_CHECK_SERVICE) private bingoCheckClient: ClientProxy,
  ) {}

  async createBingo(request: CreateBingoRequest, userId: string, authentication: string) {
    console.log('Creating bingo for user:', userId);
    

    if (!userId) {
      throw new BadRequestException('User ID is required.');
    }

    const existingBingo = await this.bingoRepository.findByUserId(userId);
    if (existingBingo) {
      throw new BadRequestException('User already has a bingo.');
    }

    const validSizes = ['3x3', '4x4', '5x5'];
    if (!validSizes.includes(request.size)) {
      throw new BadRequestException('Size must be 3x3, 4x4, or 5x5.');
    }

    const [size] = request.size.split('x').map(Number);

  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      expectedValue: null, 
      isValid: false,      
    }))
  );

    const bingo = await this.bingoRepository.create({
      userId, size, grid,
      islocked: false
    });

    return bingo;
  }

  async getBingo(userId: string): Promise<Bingo | null> {
    if (!userId) {
      throw new BadRequestException('User ID is required.');
    }

    const bingo = await this.bingoRepository.findByUserId(userId);
    if (!bingo) {
      throw new BadRequestException('Bingo not found for user.');
    }

    return bingo;

  }

  async modifyCase(userId: string, rowIndex: number, colIndex: number, newValue: string) {
    const bingo: Bingo = await this.bingoRepository.findByUserId(userId);

    if (!bingo) {
      throw new Error('Bingo not found');
    }

    const gridSize = bingo.size;
    if (rowIndex >= gridSize || colIndex >= gridSize || rowIndex < 0 || colIndex < 0) {
      throw new Error('Invalid row or column index');
    }

    bingo.grid[rowIndex][colIndex].expectedValue = newValue;

    await this.bingoRepository.findOneAndUpdate(
      { userId },
      { $set: { grid: bingo.grid } }, 
    );

    return bingo;
}

async lockBingo(userId: string): Promise<Bingo> {
  const bingo = await this.bingoRepository.findByUserId(userId);
  
  if (!bingo) {
    throw new NotFoundException('Bingo not found.');
  }

  const isFullyFilled = bingo.grid.every(row =>
    row.every(cell => cell.expectedValue !== null),
  );

  if (!isFullyFilled) {
    throw new BadRequestException('Cannot lock bingo: Some cases are still empty.');
  }

  return this.bingoRepository.findOneAndUpdate(
    { userId },
    { islocked: true },
  );
}


async checkCase(userId: string, rowIndex: number, colIndex: number) {
  const bingo: Bingo = await this.bingoRepository.findByUserId(userId);

  if (!bingo) {
    throw new Error('Bingo not found');
  }

  const gridSize = bingo.size;
  if (rowIndex >= gridSize || colIndex >= gridSize || rowIndex < 0 || colIndex < 0) {
    throw new Error('Invalid row or column index');
  }
  if (!bingo.islocked) {
    throw new BadRequestException('Cannot check a case until the bingo is locked.');
  }
  
  if (bingo.grid[rowIndex][colIndex].expectedValue === null) {
    throw new Error('No value to check');
  }

  if (bingo.grid[rowIndex][colIndex].isValid) {
    throw new Error('Case already checked');
  }

  bingo.grid[rowIndex][colIndex].isValid = true;

  await this.bingoRepository.findOneAndUpdate(
    { userId },
    { $set: { grid: bingo.grid } }, 
  );
  console.log('Emitting case_checked event');
  await lastValueFrom(
    this.bingoCheckClient.emit('case_checked', {
      userId,
      message: `User: ${userId} checked a case`,
      bingo,
      rowIndex,
      colIndex
    }),
  );

  return bingo;
}
}

import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { CreateBingoRequest } from './dto/create-bingo.request';
import { BingoService } from './bingo.service';
import { ModifyCaseRequest } from './dto/modify-case.request';
import { CheckCaseRequest } from './dto/check-case.request';

@Controller('bingo')
export class BingoController {
  constructor(private readonly bingoService: BingoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBingo(@Body() request: CreateBingoRequest, @Req() req: any) {
    const userId = req.user?._id;
    const authToken = req.cookies?.Authentication; 

    return this.bingoService.createBingo(request, userId, authToken);
  }

  @Get()
  @UseGuards(JwtAuthGuard) 
  async getBingo(@Req() req: any) {
    const userId = req.user?._id; 

    return this.bingoService.getBingo(userId);
  }

  @Patch('lock')
  @UseGuards(JwtAuthGuard)
  async lockBingo(@Req() req: any) {
    const userId = req.user._id;
    return this.bingoService.lockBingo(userId);
  }

  @Patch('modify-case')
  @UseGuards(JwtAuthGuard) 
  async modifyCase(@Body() modifyCaseRequest: ModifyCaseRequest, @Req() req: any) {
    const { rowIndex, colIndex, newValue } = modifyCaseRequest;
    const userId = req.user._id; 

    return this.bingoService.modifyCase(userId, rowIndex, colIndex, newValue);
  }

  @Patch('check-case')
  @UseGuards(JwtAuthGuard) 
  async checkCase(@Body() checkCaseRequest: CheckCaseRequest, @Req() req: any) {
    const { rowIndex, colIndex} = checkCaseRequest;
    const userId = req.user._id; 

    return this.bingoService.checkCase(userId, rowIndex, colIndex);
  }
}

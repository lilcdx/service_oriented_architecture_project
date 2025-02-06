import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class Bingo extends AbstractDocument {
  @Prop({ required: true, unique: true }) 
  userId: string;

  @Prop({ required: true })
  size: number;

  @Prop({ type: [[{ expectedValue: { type: String, default: null }, isValid: { type: Boolean, default: false } }]], default: [] })
  grid: { expectedValue: string, isValid: boolean }[][];

  @Prop({ default: false })
  islocked: boolean;
}

export const BingoSchema = SchemaFactory.createForClass(Bingo);

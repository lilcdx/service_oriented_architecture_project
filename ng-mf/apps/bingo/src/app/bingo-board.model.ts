export interface BingoCell {
    expectedValue: string;
    isValid: boolean;
    _id: string;
  }
  
  export interface BingoBoard {
    _id: string;
    userId: string;
    size: number;
    grid: BingoCell[][]; // 2D array of BingoCell
    islocked: boolean;
  }
  
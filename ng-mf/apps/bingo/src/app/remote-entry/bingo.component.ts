import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BingoService } from '../bingo.service'; // Adjust path if necessary
import { BingoBoard } from '../bingo-board.model';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css'],
  imports: [CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class BingoComponent implements OnInit {
  bingoBoard: BingoBoard | null = null;
  isLocked: boolean = false; 
  selectedSize: string = '3x3';

  constructor(private bingoService: BingoService) {}

  ngOnInit(): void {
    this.fetchBingoBoard();
  }

  fetchBingoBoard() {
    this.bingoService.getBingo().subscribe({
      next: (response) => {
        this.bingoBoard = response;
        this.isLocked = response.islocked;
        console.log('Bingo board fetched!', response);
      },
      error: (err) => {
        console.error('Error fetching bingo board', err);
      },
    });
  }

  createBingo() {
    if (!this.selectedSize) {
      alert('Please select a size before creating a Bingo board.');
      return;
    }
  
    this.bingoService.createBingo({ size: this.selectedSize }).subscribe({
      next: (response) => {
        console.log('Bingo created successfully!', response);
        this.fetchBingoBoard(); // Refresh board after creation
      },
      error: (err) => {
        console.error('Error creating Bingo board', err);
      }
    });
  }

  lockBingo() {
    this.bingoService.lockBingo().subscribe(response => {
      console.log('Bingo board locked!', response);
      this.fetchBingoBoard();
    });
  }

  onCellClick(rowIndex: number, colIndex: number, currentValue: string) {
    if (this.isLocked) {
      // If locked, check case
      this.bingoService.checkCase(rowIndex, colIndex).subscribe(response => {
        console.log('Case checked!', response);
        this.fetchBingoBoard();
      });
    } else {
      // If not locked, modify case
      const newValue = prompt('Enter new value:', currentValue);
      if (newValue !== null) {
        this.bingoService.modifyCase(rowIndex, colIndex, newValue).subscribe(response => {
          console.log('Case modified!', response);
          this.fetchBingoBoard();
        });
      }
    }
  }
}

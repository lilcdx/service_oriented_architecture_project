import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BingoBoard } from './bingo-board.model'; 

@Injectable({
  providedIn: 'root',
})
export class BingoService {
  private apiUrl = 'http://localhost:3000/bingo'; // Backend URL (make sure this is correct)
  private bingoBoardSubject = new BehaviorSubject<any>(null);  // Store bingo board state
  bingoBoard$ = this.bingoBoardSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Create a new bingo
  createBingo(bingoData: any) {
    return this.http.post(`${this.apiUrl}`, bingoData, {
      withCredentials: true, // Send cookies (JWT token)
    });
  }

  // Get the bingo board
  getBingo(): Observable<BingoBoard> {
    return this.http.get<BingoBoard>(this.apiUrl, {
      withCredentials: true, // Ensure JWT token is sent with the request
    });
  }

  // Lock the bingo board
  lockBingo() {
    return this.http.patch(`${this.apiUrl}/lock`, {}, {
      withCredentials: true, // Send cookies (JWT token)
    });
  }

  // Modify a case in the bingo board
  modifyCase(rowIndex: number, colIndex: number, newValue: string) {
    const body = { rowIndex, colIndex, newValue };
    return this.http.patch(`${this.apiUrl}/modify-case`, body, {
      withCredentials: true, // Send cookies (JWT token)
    });
  }

  // Check a case in the bingo board
  checkCase(rowIndex: number, colIndex: number) {
    const body = { rowIndex, colIndex };
    return this.http.patch(`${this.apiUrl}/check-case`, body, {
      withCredentials: true, // Send cookies (JWT token)
    });
  }
}

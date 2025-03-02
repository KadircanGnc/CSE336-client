import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardingsService } from '../../services/boardings.service';
import { HttpClientModule } from '@angular/common/http';
import { GetBoardings_WC_MLS_Response } from '../../types/types';

@Component({
  selector: 'app-boardings',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './boardings.component.html',
  styleUrls: ['./boardings.component.css'],
})
export class BoardingsComponent implements OnInit {
  boardings: GetBoardings_WC_MLS_Response[] = [];
  totalElements = 0;
  pageSize = 1000;
  page = 0;
  passengerIds: string[] = [];
  private boardingsService = inject(BoardingsService);

  ngOnInit(): void {
    this.loadBoardings();
  }

  loadBoardings(): void {
    this.boardingsService.getBoardings({
      passengerIds: this.passengerIds,
      page: this.page,
      size: this.pageSize
    }
    ).subscribe((data) => {
      this.boardings = data.content;
      this.totalElements = data.numberOfElements
    });
  }

  addPassengerId(passengerId: string): void {
    if (passengerId.length === 0) {
      return;
    }

    if (this.passengerIds.find(id => id === passengerId)) {
      return;
    }
    this.passengerIds.push(passengerId);
    this.loadBoardings();
  }

  removePassengerId(passengerId: string): void {
    this.passengerIds = this.passengerIds.filter(id => id !== passengerId);
    this.loadBoardings();
  }

  clearPassengerIds(): void {
    this.passengerIds = [];
    this.loadBoardings();
  }
}

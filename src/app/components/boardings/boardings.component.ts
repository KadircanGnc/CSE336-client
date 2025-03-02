import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardingsService } from '../../services/boardings.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-boardings',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './boardings.component.html',
  styleUrls: ['./boardings.component.css'],
})
export class BoardingsComponent implements OnInit {
  boardings: any[] = [];
  private boardingsService = inject(BoardingsService);

  ngOnInit(): void {
    this.loadBoardings();
  }

  loadBoardings(): void {
    this.boardingsService.getBoardings().subscribe((data) => {
      this.boardings = data.content;
    });
  }
}

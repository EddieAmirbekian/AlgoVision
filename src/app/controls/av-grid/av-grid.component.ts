import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'av-grid',
  templateUrl: './av-grid.component.html',
  styleUrls: ['./av-grid.component.scss'],
})
export class AvGridComponent implements OnInit {
  public readonly rowsCount = 18;
  public readonly colsCount = 52;

  public nodes: number[][] = [];

  constructor() {
    for (let i = 0; i < this.rowsCount; i++) {
      const row = [];
      for (let j = 0; j < this.colsCount; j++) {
        row.push(j);
      }
      this.nodes.push(row);
    }
  }

  ngOnInit(): void {}
}

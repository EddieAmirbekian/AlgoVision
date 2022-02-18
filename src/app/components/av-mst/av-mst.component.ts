import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Point } from '../../models/point';
import { MstService } from '../../services/mst.service';

@Component({
  selector: 'av-mst',
  templateUrl: './av-mst.component.html',
  styleUrls: ['./av-mst.component.scss'],
})
export class AvMstComponent implements AfterViewInit {
  readonly nodeRadius = 8;

  @ViewChild('canvasElement', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private vertices: Point[] = [];

  constructor(private mst: MstService) {}

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.height = window.innerHeight;
    this.canvas.nativeElement.width = window.innerWidth;
    this.vertices = [];
    this.mst.clearSubject().subscribe(() => this.clear());
  }

  canvasClick(e: MouseEvent): void {
    e.preventDefault();
    if (this.canvas) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const v = new Point(x, y);
      this.vertices.push(v);
      this.doPrim();
    }
  }

  canvasContextMenu(e: MouseEvent): void {
    e.preventDefault();
    if (this.canvas) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for (let i = 0; i < this.vertices.length; ++i) {
        const isInside =
          Math.sqrt(
            Math.pow(this.vertices[i].x - x, 2) +
              Math.pow(this.vertices[i].y - y, 2)
          ) < this.nodeRadius;
        if (isInside) {
          this.vertices.splice(i, 1);
          break;
        }
      }
      this.doPrim();
    }
  }

  doPrim(): void {
    if (this.canvas && this.ctx) {
      this.ctx.clearRect(
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
      this.primsMST(this.vertices);
    }
  }

  euclideanDistance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  primsMST(vertices: Point[]): void {
    const unreached = [...vertices] as Point[];
    const reached = [] as Point[];
    reached.push(unreached[0]);
    unreached.splice(0, 1);
    while (unreached.length) {
      let minEdge = Infinity;
      let minVertexIdx = -1;
      let parentVertexIdx = -1;
      for (let i = 0; i < reached.length; ++i) {
        for (let j = 0; j < unreached.length; ++j) {
          const edgeWeight = this.euclideanDistance(reached[i], unreached[j]);
          if (minEdge > edgeWeight) {
            minEdge = edgeWeight;
            minVertexIdx = j;
            parentVertexIdx = i;
          }
        }
      }
      if (this.ctx) {
        this.ctx.beginPath();
        this.ctx.moveTo(reached[parentVertexIdx].x, reached[parentVertexIdx].y);
        this.ctx.lineTo(unreached[minVertexIdx].x, unreached[minVertexIdx].y);
        this.ctx.strokeStyle = '#b71c1c';
        this.ctx.stroke();
      }
      reached.push(unreached[minVertexIdx]);
      unreached.splice(minVertexIdx, 1);
    }
    for (const vertex of this.vertices) {
      if (this.ctx) {
        this.ctx.fillStyle = '#283593';
        this.ctx.beginPath();
        this.ctx.arc(vertex.x, vertex.y, this.nodeRadius, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }

  clear(): void {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
      this.vertices = [];
    }
  }
}

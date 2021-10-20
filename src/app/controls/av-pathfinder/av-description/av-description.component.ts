import {Component, OnInit} from '@angular/core';
import {NodeType} from '../av-grid-node/node-type.model';

@Component({
  selector: 'av-description',
  templateUrl: './av-description.component.html',
  styleUrls: ['./av-description.component.scss']
})
export class AvDescriptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public get nodeType(): typeof NodeType {
    return NodeType;
  }
}

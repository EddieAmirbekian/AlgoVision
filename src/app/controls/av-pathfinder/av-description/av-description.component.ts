import { Component } from '@angular/core';
import { Node } from '../../../models/node.model';
import { NodeType } from '../../../models/node-type.model';
import { Point } from '../../../models/point';

@Component({
  selector: 'av-description',
  templateUrl: './av-description.component.html',
  styleUrls: ['./av-description.component.scss'],
})
export class AvDescriptionComponent {
  listItems: { name: string; node: Node }[] = [
    {
      name: 'Start Node',
      node: { position: new Point(-3, 0), type: NodeType.START } as Node,
    },
    {
      name: 'End Node',
      node: { position: new Point(-3, 1), type: NodeType.END } as Node,
    },
    // {name: 'Point Node', node: {position: new Point(-3, 2), type: NodeType.POINT} as Node},
    {
      name: 'Weight Node',
      node: { position: new Point(-3, 3), type: NodeType.WEIGHT } as Node,
    },
    {
      name: 'Unvisited Node',
      node: { position: new Point(-3, 4), type: NodeType.EMPTY } as Node,
    },
    {
      name: 'Visited Node',
      node: { position: new Point(-3, 5), type: NodeType.VISITED } as Node,
    },
    {
      name: 'Path Node',
      node: { position: new Point(-3, 6), type: NodeType.PATH } as Node,
    },
    {
      name: 'Wall Node',
      node: { position: new Point(-3, 7), type: NodeType.WALL } as Node,
    },
  ];
}

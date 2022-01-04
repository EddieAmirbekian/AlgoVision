import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Algorithm } from '../controls/models/algorithm.enum';

@Injectable()
export class AlgorithmService {
  public currentAlgorithm: BehaviorSubject<Algorithm> =
    new BehaviorSubject<Algorithm>(Algorithm.NONE);

  public setAlgorithm(algorithm: Algorithm): void {
    this.currentAlgorithm.next(algorithm);
  }

  public getAlgorithm(): Algorithm {
    return this.currentAlgorithm.value;
  }
}

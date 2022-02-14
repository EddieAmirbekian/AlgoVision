import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Algorithm } from '../models/algorithm.enum';

@Injectable()
export class AlgorithmService {
  currentAlgorithm: BehaviorSubject<Algorithm> = new BehaviorSubject<Algorithm>(
    Algorithm.NONE
  );

  setAlgorithm(algorithm: Algorithm): void {
    this.currentAlgorithm.next(algorithm);
  }

  getAlgorithm(): Algorithm {
    return this.currentAlgorithm.value;
  }
}

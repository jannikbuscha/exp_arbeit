import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private dataSubject = new BehaviorSubject<number[]>([]); // Data as observable
  private calculationTriggered = new BehaviorSubject<boolean>(false); // Trigger for calculation

  // Observable for data
  getData(): Observable<number[]> {
    return this.dataSubject.asObservable();
  }

  // Set data
  setData(data: number[]): void {
    this.dataSubject.next(data);
  }

  // Trigger for calculation
  isCalculationTriggered(): Observable<boolean> {
    return this.calculationTriggered.asObservable();
  }

  // Set trigger
  triggerCalculation(): void {
    this.calculationTriggered.next(true);
  }

  // Reset trigger
  resetCalculation(): void {
    this.calculationTriggered.next(false);
  }
}

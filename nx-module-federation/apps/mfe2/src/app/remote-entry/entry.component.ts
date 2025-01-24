import { Component, OnInit } from '@angular/core';
import {FourierService} from "./fourier.service";
import {NgForOf, NgIf} from "@angular/common";
import {SharedDataService} from "@nx-module-federation/data";

@Component({
  selector: 'app-mfe2-entry',
  standalone: true,
  template: `
    <div class="container">
      <h2>Fourier Transformation</h2>
      <div *ngIf="result.length > 0; else noData">
        <h3>Ergebnisse:</h3>
        <ul>
          <li *ngFor="let value of result">{{ value }}</li>
        </ul>
      </div>
      <ng-template #noData>
        <p>Keine Berechnung durchgeführt.</p>
      </ng-template>
    </div>
  `,
  imports: [
    NgForOf,
    NgIf
  ],
  styles: [
    `
      .container {
        padding: 20px;
        margin: auto;
        text-align: center;
      }

      h2 {
        margin-top: 0;
      }
    `
  ]
})
export class RemoteEntryComponent implements OnInit {
  data: number[] = [];
  result: number[] = [];

  constructor(
    private sharedDataService: SharedDataService,
    private fourierService: FourierService
  ) {}

  ngOnInit(): void {
    // Daten abonnieren
    this.sharedDataService.getData().subscribe(data => {
      this.data = data;
    });

    // Berechnung abonnieren
    this.sharedDataService.isCalculationTriggered().subscribe(trigger => {
      if (trigger) {
        this.calculate();
        this.sharedDataService.resetCalculation(); // Trigger zurücksetzen
      }
    });
  }

  calculate(): void {
    this.result = this.fourierService.calculateFourier(this.data);
  }
}

export default RemoteEntryComponent;

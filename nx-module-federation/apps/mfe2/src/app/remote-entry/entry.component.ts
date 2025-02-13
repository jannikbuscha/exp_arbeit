import {Component, OnInit, ViewChild} from '@angular/core';
import {FourierService} from "./fourier.service";
import {NgIf} from "@angular/common";
import {SharedDataService} from "@nx-module-federation/data";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartOptions} from "chart.js";

@Component({
  selector: 'app-mfe2-entry',
  standalone: true,
  template: `
    <div class="container">
      <h2>Fourier Transformation</h2>
      <div *ngIf="result.length > 0; else noData">
        <h3>Ergebnisse:</h3>
        <canvas baseChart
                [data]="chartData"
                [options]="chartOptions"
                [legend]="false"
                [type]="'line'">
        </canvas>
      </div>
      <ng-template #noData>
        <p>Keine Berechnung durchgeführt.</p>
      </ng-template>
    </div>
  `,
  imports: [
    BaseChartDirective,
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
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  data: number[] = [];
  result: number[] = [];

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Fourier Transformierte Daten',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false
      }
    ]
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Index'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Wert'
        }
      }
    }
  };

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
    this.updateChart();
  }

  private updateChart(): void {
    this.chartData.labels = this.result.map((_, index) => index.toString());
    this.chartData.datasets[0].data = this.result;
    this.chart?.update();
  }
}

export default RemoteEntryComponent;

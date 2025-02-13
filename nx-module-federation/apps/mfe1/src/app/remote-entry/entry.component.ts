import {Component, ViewChild} from '@angular/core';
import {DataService} from "./data.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {SharedDataService} from "@nx-module-federation/data";
import {ChartConfiguration, ChartOptions} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-mfe1-entry',
  template: `
    <div class="container">
      <h2>Fourier Daten</h2>
      <form (ngSubmit)="fetchData()" class="form">
        <label for="size">Anzahl der Punkte:</label>
        <input type="number" id="size" [(ngModel)]="size" name="size" required/>

        <label for="frequency">Frequenz:</label>
        <input type="number" id="frequency" [(ngModel)]="frequency" name="frequency" step="0.1" required/>

        <label for="amplitude">Amplitude:</label>
        <input type="number" id="amplitude" [(ngModel)]="amplitude" name="amplitude" step="0.1" required/>

        <button type="submit">Daten laden</button>
      </form>

      <div *ngIf="data.length > 0">
        <canvas baseChart
                style="margin-top: 10px;"
                [type]="'line'"
                [data]="chartData"
                [options]="chartOptions"
                [legend]="false">
        </canvas>
      </div>
    </div>
  `,
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

      .form {
        display: flex;
        flex-direction: column;
      }

      form label {
        display: block;
        margin: 10px 0 5px;
      }

      form input {
        padding: 8px;
        margin-bottom: 10px;
      }

      button {
        padding: 10px 20px;
        border: none;
        cursor: pointer;
      }
    `
  ],
  imports: [
    FormsModule,
    NgIf,
    BaseChartDirective
  ],
  standalone: true,
})
export class RemoteEntryComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  data: number[] = [];
  size = 16;
  frequency = 1.0;
  amplitude = 1.0;

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Sinuskurve',
        borderColor: 'rgba(75, 192, 192, 1)',
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
    private dataService: DataService,
    private sharedDataService: SharedDataService // Shared Service injizieren
  ) {
  }

  fetchData(): void {
    this.dataService.getData(this.size, this.frequency, this.amplitude).subscribe(
      response => {
        this.data = response.data;
        this.sharedDataService.setData(this.data); // Daten setzen
        this.updateChart();
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  private updateChart(): void {
    this.chartData.labels = this.data.map((_, index) => index.toString());
    this.chartData.datasets[0].data = this.data;
    this.chart?.update();
  }

  // triggerCalculation(): void {
  //   this.sharedDataService.setData(this.data); // Daten setzen
  //   this.sharedDataService.triggerCalculation(); // Trigger auslösen
  // }
}

export default RemoteEntryComponent;

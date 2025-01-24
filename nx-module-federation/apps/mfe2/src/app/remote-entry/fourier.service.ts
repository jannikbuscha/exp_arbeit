import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FourierService {
  calculateFourier(input: number[]): number[] {
    const N = input.length;
    const result: number[] = [];

    for (let k = 0; k < N; k++) {
      let real = 0;
      let imag = 0;
      for (let n = 0; n < N; n++) {
        const angle = (2 * Math.PI * k * n) / N;
        real += input[n] * Math.cos(angle);
        imag -= input[n] * Math.sin(angle);
      }
      result[k] = Math.sqrt(real * real + imag * imag); // Amplitude
    }

    return result;
  }
}

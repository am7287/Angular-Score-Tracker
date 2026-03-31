import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  minScore = 0;
  maxScore = 50;

  private currentScore = 0;
  private currentStep = 1;

  get score(): number {
    return this.currentScore;
  }

  set score(value: number | string) {
    this.currentScore = this.clamp(value, this.minScore, this.maxScore);
  }

  get stepValue(): number {
    return this.currentStep;
  }

  set stepValue(value: number | string) {
    this.currentStep = this.clamp(value, 1, this.maxScore);
  }

  get message(): string {
    if (this.score === 0) {
      return 'Game not started';
    }

    if (this.score <= 20) {
      return 'Keep playing!';
    }

    if (this.score <= 40) {
      return 'Great progress!';
    }

    return 'Almost there!';
  }

  get increaseText(): string {
    return this.score === this.maxScore ? 'Maximum Reached' : 'Increase Score';
  }

  increaseScore(): void {
    this.score = this.score + this.stepValue;
  }

  decreaseScore(): void {
    this.score = this.score - this.stepValue;
  }

  resetScore(): void {
    this.score = 0;
  }

  private clamp(value: number | string, min: number, max: number): number {
    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      return min;
    }

    return Math.min(Math.max(numberValue, min), max);
  }
}

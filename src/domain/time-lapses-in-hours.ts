import { Time } from '@contracts/DTO/dataset';

export class TimeLapsesInHours {
  private readonly _startA: number;
  private readonly _endA: number;
  private readonly _startB: number;
  private readonly _endB: number;

  private get first() {
    return this._startA === this._startB && this._endA === this._endB;
  }

  private get second() {
    const A = this._startA >= this._startB && this._startA < this._endB && this._endA > this._startB && this._endA <= this._endB;
    const B = this._startB <= this._startA && this._startB < this._endA && this._endB > this._startA && this._endB >= this._endA;

    return A && B;
  }

  private get third() {
    const A = this._startA <= this._startB && this._startA < this._endB && this._endA > this._startB && this._endA >= this._endB;
    const B = this._startB >= this._startA && this._startB < this._endA && this._endB > this._startA && this._endB <= this._endA;

    return A && B;
  }

  private get fourth() {
    const A = this._startA >= this._startB && this._startA < this._endB && this._endA > this._startB && this._endA >= this._endB;
    const B = this._startB <= this._startA && this._startB < this._endA && this._endB > this._startA && this._endB <= this._endA;

    return A && B;
  }

  private get fifth() {
    const A = this._startA <= this._startB && this._startA < this._endB && this._endA > this._startB && this._endA <= this._endB;
    const B = this._startB >= this._startA && this._startB < this._endA && this._endB > this._startA && this._endB >= this._endA;

    return A && B;
  }

  constructor(timeA: Omit<Time, 'day'>, timeB: Omit<Time, 'day'>) {
    const {
      start: { hour: startA },
      end: { hour: endA }
    } = timeA;
    const {
      start: { hour: startB },
      end: { hour: endB }
    } = timeB;
    this._startA = startA;
    this._endA = endA;
    this._startB = startB;
    this._endB = endB;
  }

  hasCoincidences() {
    return [this.first, this.second, this.third, this.fourth, this.fifth].some(lapse => lapse);
  }
}

export class TimeLapses {
  private readonly _startA: number;
  private readonly _endA: number;
  private readonly _startB: number;
  private readonly _endB: number;

  constructor([startA, endA]: [number, number], [startB, endB]: [number, number]) {
    this._startA = startA;
    this._endA = endA;
    this._startB = startB;
    this._endB = endB;
  }

  hasCoincidences() {
    let coincidence = this.firstLapse();
    if (!coincidence) {
      coincidence = this.secondLapse();
      if (!coincidence) {
        coincidence = this.thirdLapse();
        if (!coincidence) {
          coincidence = this.fourthLapse();
          if (!coincidence) {
            coincidence = this.fifthLapse();
          }
        }
      }
    }

    return coincidence;
  }

  private firstLapse() {
    return this._startA === this._startB && this._endA === this._endB;
  }

  private secondLapse() {
    const A = this._startA >= this._startB && this._startA < this._endB && this._endA >= this._endB;
    const B = this._startB <= this._startA && this._endB > this._startA && this._endB <= this._endA;

    return A && B;
  }

  private thirdLapse() {
    const A = this._startA <= this._startB && this._endA > this._startB && this._endA <= this._endB;
    const B = this._startB >= this._startA && this._startB < this._endA && this._endB >= this._endA;

    return A && B;
  }

  private fourthLapse() {
    const A = this._startA >= this._startB && this._endA > this._startB && this._endA <= this._endB;
    const B = this._startB <= this._startA && this._endB > this._startA && this._endB >= this._endA;

    return A && B;
  }

  private fifthLapse() {
    const A = this._startA <= this._startB && this._endA > this._startB && this._endA >= this._endB;
    const B = this._startB >= this._startA && this._endB > this._startA && this._endB <= this._endA;

    return A && B;
  }
}

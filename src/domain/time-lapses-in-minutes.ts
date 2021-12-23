import { Time } from '@contracts/DTO/dataset';

export class TimeLapsesInMinutes {
  private readonly _startHA: number;
  private readonly _startMA: number;
  private readonly _endHA: number;
  private readonly _endMA: number;
  private readonly _startHB: number;
  private readonly _startMB: number;
  private readonly _endHB: number;
  private readonly _endMB: number;

  private get first() {
    return this._startHA === this._startHB && this._endHA < this._endHB && this._startMA <= this._startMB;
  }

  private get second() {
    return this._startHA === this._startHB && this._endHA > this._endHB && this._startMA >= this._startMB;
  }

  private get third() {
    return this._endHA === this._endHB && this._startHA < this._startHB && this._endMA <= this._endMB;
  }

  private get fourth() {
    return this._endHA === this._endHB && this._startHA > this._startHB && this._endMA >= this._endMB;
  }

  private get fifth() {
    return this._startHA === this._startHB && this._endHA < this._endHB && this._startMA >= this._startMB;
  }

  private get sixth() {
    return this._startHA === this._startHB && this._endHA > this._endHB && this._startMA <= this._startMB;
  }

  private get seventh() {
    return this._endHA === this._endHB && this._startHA > this._startHB && this._endMA <= this._endMB;
  }

  private get eighth() {
    return this._endHA === this._endHB && this._startHA < this._startHB && this._endMA >= this._endMB;
  }

  private get nineth() {
    return this._startHA === this._startHB && this._endHA === this._endHB && this._startMA <= this._startMB && this._endMA <= this._endMB;
  }

  private get tenth() {
    return this._startHA === this._startHB && this._endHA === this._endHB && this._startMA >= this._startMB && this._endMA >= this._endMB;
  }

  private get eleventh() {
    return this._startHA === this._startHB && this._endHA === this._endHB && this._startMA <= this._startMB && this._endMA >= this._endMB;
  }

  private get twelfth() {
    return this._startHA === this._startHB && this._endHA === this._endHB && this._startMA >= this._startMB && this._endMA <= this._endMB;
  }

  constructor(timeA: Omit<Time, 'day'>, timeB: Omit<Time, 'day'>) {
    const {
      start: { hour: startHA, minute: startMA },
      end: { hour: endHA, minute: endMA }
    } = timeA;
    const {
      start: { hour: startHB, minute: startMB },
      end: { hour: endHB, minute: endMB }
    } = timeB;
    this._startHA = startHA;
    this._startMA = startMA;
    this._endHA = endHA;
    this._endMA = endMA;
    this._startHB = startHB;
    this._startMB = startMB;
    this._endHB = endHB;
    this._endMB = endMB;
  }

  hasCoincidences() {
    return [
      this.first,
      this.second,
      this.third,
      this.fourth,
      this.fifth,
      this.sixth,
      this.seventh,
      this.eighth,
      this.nineth,
      this.tenth,
      this.eleventh,
      this.twelfth
    ].some(lapse => lapse);
  }
}

import { Time, TimeDetail } from '@contracts/DTO/dataset';

export class TimeLapsesInMinutes {
  private readonly _startA: TimeDetail;
  private readonly _endA: TimeDetail;
  private readonly _startB: TimeDetail;
  private readonly _endB: TimeDetail;

  constructor(timeA: Omit<Time, 'day'>, timeB: Omit<Time, 'day'>) {
    this._startA = timeA.start;
    this._endA = timeA.end;
    this._startB = timeB.start;
    this._endB = timeB.end;
  }

  hasCoincidences() {
    const { hour: startHA, minute: startMA } = this._startA;
    const { hour: endHA, minute: endMA } = this._endA;
    const { hour: startHB, minute: startMB } = this._startB;
    const { hour: endHB, minute: endMB } = this._endB;
    const first = startHA === startHB && endHA < endHB && startMA <= startMB;
    const second = startHA === startHB && endHA > endHB && startMA >= startMB;
    const third = endHA === endHB && startHA < startHB && endMA <= endMB;
    const fourth = endHA === endHB && startHA > startHB && endMA >= endMB;
    const fifth = startHA === startHB && endHA < endHB && startMA >= startMB;
    const sixth = startHA === startHB && endHA > endHB && startMA <= startMB;
    const seventh = endHA === endHB && startHA > startHB && endMA <= endMB;
    const eighth = endHA === endHB && startHA < startHB && endMA >= endMB;
    const nineth = startHA === startHB && endHA === endHB && startMA <= startMB && endMA <= endMB;
    const tenth = startHA === startHB && endHA === endHB && startMA >= startMB && endMA >= endMB;
    const eleventh = startHA === startHB && endHA === endHB && startMA <= startMB && endMA >= endMB;
    const twelfth = startHA === startHB && endHA === endHB && startMA >= startMB && endMA <= endMB;
    const thirteenth = startHA === endHB && startHA > startHB && endHB < endHA && startMA <= endMB;
    const fourteenth = startHB === endHA && startHB > startHA && endHA < endHB && startMB <= endMA;
    const fifteenth = startHA === startHB && startHB === endHA && endHA < endHB && startMA <= startMB && startMB <= endMA;
    const sixteenth = startHB === endHA && endHA === endHB && startHA < startHB && startMB <= endMA && endMA <= endMB;
    const seventeenth = startHB === endHB && startHA < startHB && endHB < endHA && startMB < endMB;
    const eighteenth = startHA === endHA && startHB < startHA && endHA < endHB && startMA < endMA;
    const nineteenth = startHA === startHB && startHB === endHB && endHB < endHA && startMA <= startMB && startMB < endMB;
    const twentieth = startHA === endHA && endHA === endHB && startHA > startHB && startMA < endMA && endMA <= endMB;

    return [
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eighth,
      nineth,
      tenth,
      eleventh,
      twelfth,
      thirteenth,
      fourteenth,
      fifteenth,
      sixteenth,
      seventeenth,
      eighteenth,
      nineteenth,
      twentieth
    ].some(lapse => lapse);
  }
}

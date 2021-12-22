import { Inject, Injectable } from '@nestjs/common';
import { DatasetFactoryFunc } from '@domain/providers/dataset.provider';

@Injectable()
export class FrequencyService {
  constructor(@Inject('DATASET') private readonly _factory: DatasetFactoryFunc) {}

  calcFrequency(dataset: string[]) {
    this._factory(dataset).getDatasetResult();
  }
}

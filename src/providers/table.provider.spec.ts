import Table = require('cli-table');
import { Test } from '@nestjs/testing';
import { TableFunc, TABLE_PROVIDER } from '@providers/table.provider';

describe('TableProvider', () => {
  let table: TableFunc;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TABLE_PROVIDER]
    }).compile();

    table = module.get<TableFunc>('TABLE');
  });

  it('should correctly create the console table provider', () => {
    // assert
    expect(table).toBeDefined();
  });

  it('should create a test table in console when invoking provider', () => {
    // act
    const instance = table();
    const length = instance.push(['RENE-ASTRID', 3]);
    console.log(instance.toString());

    // assert
    expect(instance).toBeDefined();
    expect(instance).toBeInstanceOf(Table);
    expect(length).toBe(1);
  });
});

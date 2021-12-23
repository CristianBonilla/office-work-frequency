import Table = require('cli-table');
import { ValueProvider } from '@nestjs/common';

export type TableFunc = () => Table;

export const TABLE_PROVIDER: ValueProvider<TableFunc> = {
  provide: 'TABLE',
  useValue: () =>
    new Table({
      head: ['Employee Name', 'Office Time Coincidence'],
      chars: {
        top: '═',
        'top-mid': '╤',
        'top-left': '╔',
        'top-right': '╗',
        bottom: '═',
        'bottom-mid': '╧',
        'bottom-left': '╚',
        'bottom-right': '╝',
        left: '║',
        'left-mid': '╟',
        mid: '─',
        'mid-mid': '┼',
        right: '║',
        'right-mid': '╢',
        middle: '│'
      },
      style: { 'padding-left': 3, 'padding-right': 3 }
    })
};

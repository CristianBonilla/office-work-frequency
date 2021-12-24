import chalk = require('chalk');

export const LOG = (message: string) => console.log(chalk.blue(`\n${message}\n`));

export const SUCCESS = (message: string) => console.log(chalk.green(`\n${message}\n`));

export const WARN = (message: string) => console.log(chalk.keyword('orange')(`\n${message}\n`));

export const ERROR = (message: string) => console.log(chalk.red(`\n${message}\n`));

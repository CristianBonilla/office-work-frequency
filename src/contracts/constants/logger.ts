import chalk = require('chalk');

export const LOG = (message: string) => console.log(chalk.blue(message));

export const SUCCESS = (message: string) => console.log(chalk.green(message));

export const WARN = (message: string) => console.log(chalk.keyword('orange')(message));

export const ERROR = (message: string) => console.log(chalk.red(message));

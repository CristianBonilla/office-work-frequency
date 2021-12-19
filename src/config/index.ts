import * as path from 'path';

export { DB_CONNECTIONS } from 'src/config/connections.config';

export const ENV = process.env.NODE_ENV;

export const ENV_FILE_PATH = path.resolve(process.cwd(), 'src/config/env', !!ENV ? `.env.${ENV}` : '.env');

export const CONFIGURATION = () => ({
  NODE_ENV: ENV,
  port: parseInt(process.env.PORT ?? '', 10) || 8001
});

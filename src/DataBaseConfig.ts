import * as path from 'path';
import * as dotenv from 'dotenv';
import { join } from 'path';

const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.${env}.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) { /* do nothing */ }

export const DatabaseConfig = {
  type: process.env.TYPEORM_TYPE as any,
  database: process.env.TYPEORM_DATABASE,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  host: process.env.TYPEORM_HOST,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: false,
}

export default DatabaseConfig;

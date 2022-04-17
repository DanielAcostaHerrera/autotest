import * as path from 'path';
import * as dotenv from 'dotenv';
import { join } from 'path';
const config = require('../config.json');

//const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) { /* do nothing */ }

export const DatabaseConfig = {
  type: config[process.env.RUN].TYPEORM_TYPE as any,
  database: config[process.env.RUN].TYPEORM_DATABASE,
  port: parseInt(config[process.env.RUN].TYPEORM_PORT),
  username: config[process.env.RUN].TYPEORM_USERNAME,
  password: config[process.env.RUN].TYPEORM_PASSWORD,
  host: config[process.env.RUN].TYPEORM_HOST,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: false,
}
console.log(DatabaseConfig)
export default DatabaseConfig;

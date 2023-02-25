import { config } from 'dotenv';

config();

export const DB_URL = process.env.DB_URL;
export const SECRETKEY = process.env.SECRETKEY;
export const EXPIRESIN = process.env.EXPIRESIN;

import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv'
dotenv.config();

@Injectable()
export class ConfigService {
    env = process.env.NODE_ENV;

    db = {
        mongodb_username: process.env.MONGODB_USERNAME,
        mongodb_password: process.env.MONGODB_PASSWORD,
        mongodb_server: process.env.MONGODB_SERVER,
        mongodb_name: process.env.MONGODB_NAME,
    };
}
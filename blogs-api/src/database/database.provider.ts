import * as mongoose from 'mongoose';
import { ConfigService } from '../config/config.service';
import constants from '../config/constants';

export const databaseProviders = [
    {
        provide: constants.MONGODB_CONNECTION_TOKEN,
        useFactory: async (configService: ConfigService) => {
            (mongoose as any).Promise = global.Promise;
            return await connectWithRetry(
                configService.db.mongodb_server,
                configService.db.mongodb_name,
                configService.db.mongodb_username,
                configService.db.mongodb_password,
            );
        },
        inject: [ConfigService]
    }
];

var connectWithRetry = async function (dbServer, dbName, dbUsername, dbPassword) {
    var db = mongoose.connection;
    let connected = false;
    let attempts = 0;
    while (!connected && attempts <= 20) {
        console.log('tyring to connect...');
        await mongoose
            .connect(dbServer, {
                dbName: dbName,
                user: dbUsername,
                pass: dbPassword,
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                connected = true;
            })
            .catch(() => {
                sleep(5000);
                ++attempts;
            });
    }

    if (connected) {
        console.log('connected successfully!');
    }

    return db;
}

function sleep(millisecondsToWait) {
    var now = new Date().getTime();
    while (new Date().getTime < now + millisecondsToWait) { }
}
import { Connection } from 'mongoose';
import constants from '../../../config/constants';
import { BlogSchema } from './blog.schema';

export const BlogProviders = [
    {
        provide: constants.BLOG_MODEL_TOKEN,
        useFactory: (connection: Connection) =>
            connection.model('Blog', BlogSchema, constants.COLLECTION_NAME),
        inject: [constants.MONGODB_CONNECTION_TOKEN],
    }
]
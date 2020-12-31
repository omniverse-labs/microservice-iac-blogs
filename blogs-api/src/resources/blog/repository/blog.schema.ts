const mongoose = require('mongoose'); // tslint:disable-line
import { Schema } from 'mongoose';

export const BlogSchema = new Schema(
    {
        blogId: { type: String, unique: true },
        title: String,
        text: String,
        tenant_id: String,
    },
    { timestamps: true }
);
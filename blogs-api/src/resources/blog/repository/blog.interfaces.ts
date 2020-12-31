import { Document } from 'mongoose';

export default interface Blog extends Document {
    readonly blogId: string;
    readonly title: string;
    readonly text: string;
    readonly tenant_id: string;
}
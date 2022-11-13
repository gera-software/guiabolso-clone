import { connect, disconnect } from "../config/database";
import { Schema, model } from 'mongoose';
import { User } from '../types'

const schema = new Schema<User>({
    name: String,
    email: String,
});

const UserModel = model<User>('users', schema);

export async function getById(id): Promise<User | null> {
    await connect();
    const result = await UserModel.findById(id);
    await disconnect();
    return result;
}

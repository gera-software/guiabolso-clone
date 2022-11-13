import { connect, disconnect } from "../config/database";
import { Schema, Types, model } from 'mongoose';
import { Account } from '../types'

const schema = new Schema<Account>({
    name: String,
    syncType: String,
    pluggyAccountId: { type: String, required: false },
    balance: Number,
    currencyCode: String,
    type: String,
    userId: Types.ObjectId,
});

const AccountModel = model<Account>('accounts', schema);


export async function fetchAll(): Promise<Account[]> {
    await connect();
    const result = await AccountModel.find();
    await disconnect();
    return result;
}

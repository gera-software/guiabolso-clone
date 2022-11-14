import { connect, disconnect } from "../config/database";
import { Schema, model } from 'mongoose';
import { Transaction } from '../types'

const schema = new Schema<Transaction>({
    pluggyTransactionId: { type: String, required: false },
    description: String,
    amount: Number,
    currencyCode: String,
    date: Date,
    category: {
        _id: String,
        name: String,
        iconName: String,
        primaryColor: String
    },
    type: String,
    status: String,
    comment: { type: String, required: false },
    ignored: Boolean,
    accountId: String,
    _isDeleted: Boolean,
});

const TransactionModel = model<Transaction>('transactions', schema);

/**
 * Get a not deleted transaction by id
 * @param id 
 * @returns 
 */
export async function getById(id): Promise<Transaction | null> {
    await connect();
    const result = await TransactionModel.findOne({ _id: id, _isDeleted: false });
    await disconnect();
    return result;
}

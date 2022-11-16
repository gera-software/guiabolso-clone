import { connect, disconnect } from "../config/database";
import { Schema, Types, model } from 'mongoose';
import { Account, AccountSummaryDTO } from '../types'


const schema = new Schema<Account>({
    name: String,
    imageUrl: { type: String, required: false },
    syncType: String,
    pluggyAccountId: { type: String, required: false },
    balance: Number,
    currencyCode: String,
    type: String,
    userId: Types.ObjectId,
    accountOwner: {
        name: String,
        pluggyIdentityId: { type: String, required: false },
        cpf: { type: String, required: false },
    },
    connection: {
        pluggyItemId: String,
        lastUpdatedAt: Date,
        status: String,
    },
    bankData: {
        institution: {
            _id: { type: Types.ObjectId, required: false },
            pluggyConnectorId: { type: Number, required: false },
            name: String,
            imageUrl: { type: String, required: false },
            primaryColor: { type: String, required: false },
        } 
    },
    creditData: {
        institution: {
            _id: { type: Types.ObjectId, required: false },
            pluggyConnectorId: { type: Number, required: false },
            name: String,
            imageUrl: { type: String, required: false },
            primaryColor: { type: String, required: false },
        },
        brand: String,
        creditLimit: Number,
        availableCreditLimit: Number,
        closeDate: Date,
        dueDate: Date,
    }
});

const AccountModel = model<Account>('accounts', schema);

export async function fetchByUserId(id): Promise<AccountSummaryDTO[]> {
    await connect();
    const result = await AccountModel.aggregate([
        { $match: { userId: new Types.ObjectId(id) } },
        { $project: {
                _id: 1,
                name: 1,
                imageUrl: 1,
                syncType: 1,
                balance: 1,
                currencyCode: 1,
                type: 1,
                userId: 1,
                connection: {
                    lastUpdatedAt: 1,
                    status: 1,
                },
            }
        },
    ]) as AccountSummaryDTO[];
    await disconnect();
    return result;
}

export async function getById(id): Promise<Account | null> {
    await connect();
    const result = await AccountModel.findById(id);
    await disconnect();
    return result;
}

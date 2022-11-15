import { connect, disconnect } from "../config/database";
import { Schema, Types, model } from 'mongoose';
import { Account } from '../types'


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

export async function fetchByUserId(id): Promise<Account[]> {
    await connect();
    const result = await AccountModel.find({ userId: id });
    await disconnect();
    return result;
}

export async function getById(id): Promise<Account | null> {
    await connect();
    const result = await AccountModel.findById(id);
    await disconnect();
    return result;
}

import { connect, disconnect } from "../config/database";
import { Schema, model, Types } from 'mongoose';
import { CurrencyCodes, Transaction, TransactionType } from '../types'
import { TransactionStatus } from "pluggy-sdk";

const schema = new Schema<Transaction>({
    pluggyTransactionId: { type: String, required: false },
    description: String,
    amount: Number,
    currencyCode: String,
    date: Date,
    category: {
        _id: Types.ObjectId,
        name: String,
        iconName: String,
        primaryColor: String
    },
    type: String,
    status: String,
    comment: { type: String, required: false },
    ignored: Boolean,
    accountId: Types.ObjectId,
    userId: Types.ObjectId,
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

/**
 * Logical deletion of a transaction
 * @param id 
 * @returns 
 */
export async function remove(id): Promise<Transaction | null> {
    await connect();
    const result = await TransactionModel.findOneAndUpdate({ _id: id }, { _isDeleted: true });
    await disconnect();
    return result;
}

/**
 * Fetch all (not deleted) transactions by account id
 * TODO paginate results by month (temporarily limited to 20 last items)
 * @param id 
 * @returns 
 */
export async function fetchByAccount(id): Promise<Transaction[]> {
    await connect();
    const result = await TransactionModel.find({ accountId: id, _isDeleted: false })
        .sort({'date': -1})
        .limit(20);
    await disconnect();
    return result;
}

/**
 * Fetch all (not deleted) transactions by user id in a given month
 * @param id 
 * @returns 
 */
export async function fetchByUser(id, monthField, yearField): Promise<Transaction[]> {
    await connect();

    const year = parseInt(yearField)
    const month = parseInt(monthField)

    const firstDay = new Date(`${year}-${month}-01`)
    const lastDay = (month === 12) ? ( new Date(`${year + 1}-01-01`) ) : ( new Date(`${year}-${month + 1}-01`) )

        const result = await TransactionModel.aggregate([
            { $match: { userId: new Types.ObjectId(id), _isDeleted: false, date: { $gte: firstDay, $lt: lastDay } } },
            { $lookup: { 
                from: 'accounts', 
                localField: 'accountId', 
                foreignField: '_id', 
                as: 'account' 
                }
            },
            { $unwind: { 'path': '$account' } },
            { $project: {
                  'account': {
                    'syncType': 0, 
                    'pluggyAccountId': 0, 
                    'balance': 0, 
                    'currencyCode': 0, 
                    'userId': 0, 
                    'accountOwner': 0, 
                    'bankData': 0, 
                    'creditData': 0, 
                    'connection': 0
                  }
                }
            },
            { $sort: { date: -1 } }
          ]);

    await disconnect();
    return result;
}

/**
 * Creates a transaction
 * @param transaction 
 * @returns 
 */
export async function create(transaction: Transaction | null): Promise<Transaction | null> {
    await connect();
    const doc = new TransactionModel(transaction);
    const result = await doc.save();
    await disconnect();

    return result;
}

/**
 * Replace one trasaction
 * @param transaction 
 * @returns 
 */
export async function updateOne(transaction: Transaction): Promise<Transaction | null> {
    await connect();
    const result = await TransactionModel.findOneAndReplace({ _id: transaction?._id }, transaction);
    await disconnect();

    return result;
}

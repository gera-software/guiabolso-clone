import { connect, disconnect } from "../config/database";
import { Schema, model, Types } from 'mongoose';
import { AccountSyncType, CurrencyCodes, Transaction, TransactionSummary, TransactionType } from '../types'

const schema = new Schema<Transaction>({
    pluggyTransactionId: { type: String, required: false },
    description: String,
    descriptionOriginal: String,
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
    syncType: String,
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
 * Fetch all (not deleted) transactions by account id in a given month
 * @param id 
 * @returns 
 */
export async function fetchByAccount(id, monthField, yearField): Promise<TransactionSummary[]> {
    await connect();

    const year = parseInt(yearField)
    const month = parseInt(monthField)

    const firstDay = new Date(`${year}-${month}-01`)
    const lastDay = (month === 12) ? ( new Date(`${year + 1}-01-01`) ) : ( new Date(`${year}-${month + 1}-01`) )

    const result = await TransactionModel.aggregate([
            { $match: { accountId: new Types.ObjectId(id), _isDeleted: false, date: { $gte: firstDay, $lt: lastDay } } },
            { $lookup: { 
                from: 'accounts', 
                localField: 'accountId', 
                foreignField: '_id', 
                as: 'account' 
                }
            },
            { $unwind: { 'path': '$account' } },
            { $project: {
                    _id: 1,
                    description: 1,
                    descriptionOriginal: 1,
                    amount: 1,
                    currencyCode: 1,
                    date: 1,
                    category: 1,
                    type: 1,
                    status: 1,
                    ignored: 1,
                    account: {
                        _id: 1,
                        name: 1,
                        type: 1,
                        imageUrl: 1
                    }
                }
            },
            { $sort: { date: -1 } }
          ]) as TransactionSummary[];

    await disconnect();
    return result;
}

/**
 * Fetch all (not deleted) transactions by user id in a given month
 * @param id 
 * @returns 
 */
export async function fetchByUser(id, monthField, yearField): Promise<TransactionSummary[]> {
    
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
                    _id: 1,
                    description: 1,
                    descriptionOriginal: 1,
                    amount: 1,
                    currencyCode: 1,
                    date: 1,
                    category: 1,
                    type: 1,
                    status: 1,
                    ignored: 1,
                    account: {
                        _id: 1,
                        name: 1,
                        type: 1,
                        imageUrl: 1
                    }
                }
            },
            { $sort: { date: -1 } }
          ]) as TransactionSummary[];

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
 * Replace one transaction
 * @param transaction 
 * @returns 
 */
export async function replaceOne(transaction: Transaction): Promise<Transaction | null> {
    await connect();
    const result = await TransactionModel.findOneAndReplace({ _id: transaction?._id }, transaction);
    await disconnect();

    return result;
}

export async function updateOne(transaction: Transaction): Promise<Transaction | null> {
    await connect();
    const doc = await TransactionModel.findById(transaction._id);

    if(doc) {
        doc.description = transaction.description
        doc.amount = transaction.amount
        doc.date = transaction.date
        doc.category = transaction.category
        doc.type = transaction.type
        doc.comment = transaction.comment
        doc.ignored = transaction.ignored
        await doc.save();
    }

    await disconnect();

    return doc;
}

export async function batchUpdate(id, yearField, monthField) {
    const year = parseInt(yearField)
    const month = parseInt(monthField)

    const firstDay = new Date(`${year}-${month}-01`)

    TransactionModel.
        find({ accountId: new Types.ObjectId(id), date: { $gte: firstDay } }).
        cursor().
        on('data', function(doc) { console.log(doc); }).
        on('end', function() { console.log('Done!'); });
}

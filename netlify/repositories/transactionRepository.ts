import { connect, disconnect } from "../config/database";
import { Schema, model, Types, PipelineStage } from 'mongoose';
import { AccountSyncType, CurrencyCodes, Transaction, TransactionSummary, TransactionType } from '../types'
import schema from "./schemas/transactionSchema";

const TransactionModel = model<Transaction>('transactions', schema);

/**
 * Get a not deleted transaction by id
 * @param id 
 * @returns 
 */
export async function getById(id): Promise<Transaction | null> {
    await connect();
    const result = await TransactionModel.findOne({ _id: id, _isDeleted: { $ne: true } });
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
    const result = await TransactionModel.findOneAndUpdate({ _id: id }, { _isDeleted: { $ne: true } });
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
            { $match: { accountId: new Types.ObjectId(id), _isDeleted: { $ne: true } , date: { $gte: firstDay, $lt: lastDay } } },
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
export async function fetchByUser(id, monthField, yearField, limit = 0): Promise<TransactionSummary[]> {
    
    await connect();

    const year = parseInt(yearField)
    const month = parseInt(monthField)

    const firstDay = new Date(`${year}-${month}-01`)
    const lastDay = (month === 12) ? ( new Date(`${year + 1}-01-01`) ) : ( new Date(`${year}-${month + 1}-01`) )


    const pipeline: PipelineStage[] = []
    pipeline.push(
        { $match: { userId: new Types.ObjectId(id), _isDeleted: { $ne: true }, date: { $gte: firstDay, $lt: lastDay } } },
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
        { $sort: { date: -1 } },
    )

    if(limit > 0) {
        pipeline.push({ $limit: limit })
    }

    const result = await TransactionModel.aggregate(pipeline) as TransactionSummary[];

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

export async function batchUpdate(transactions: Transaction[]) {
    await connect();
    console.log(transactions[0])

    const updateArray = transactions.map(transaction => ({
        updateOne: {
            filter: { pluggyTransactionId: transaction.pluggyTransactionId },
            // If you were using the MongoDB driver directly, you'd need to do
            // `update: { $set: { title: ... } }` but mongoose adds $set for
            // you.
            update: transaction,
            upsert: true,
          } 
    }))

    await TransactionModel.bulkWrite(
        updateArray
      ).then(res => {
        console.log(res);
      });

    await disconnect();
}

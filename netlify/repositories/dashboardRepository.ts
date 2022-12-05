import { connect, disconnect } from "../config/database";
import { Schema, model, Types } from 'mongoose';
import { Category, Transaction, TransactionSummary } from '../types'
import schema from "./schemas/transactionSchema";


interface SpendingByCategory {
    _id: string,
    category: Category,
    totalAmount: number,
}

interface MonthPlanning {
    type: string,
    totalAmount: number,
}

const TransactionModel = model<Transaction>('transactions', schema);

/**
 * calculates the (not ignored) categories with the highest expenses by user id in a given month
 * @param id 
 * @param monthField 
 * @param yearField 
 * @returns 
 */
export async function getHighestMonthlySpendings(id, monthField, yearField): Promise<SpendingByCategory[]> {
    await connect();
    const year = parseInt(yearField)
    const month = parseInt(monthField)

    const firstDay = new Date(`${year}-${month}-01`)
    const lastDay = (month === 12) ? ( new Date(`${year + 1}-01-01`) ) : ( new Date(`${year}-${month + 1}-01`) )

    const result = await TransactionModel.aggregate([
            { $match: { userId: new Types.ObjectId(id), _isDeleted: { $ne: true }, ignored: { $ne: true }, "category.ignored": false , date: { $gte: firstDay, $lt: lastDay } } },
            {
                $group :
                  {
                    _id : "$category._id",
                    category: { $first: "$category" },
                    totalAmount: { $sum: "$amount" }
                  }
            },
            {
                $match: { "totalAmount": { $lt: 0 } }
            },
            { $sort: { totalAmount: 1 } }
          ]) as SpendingByCategory[];
    

    await disconnect();
    return result;
}

/**
 * calculates the (not ignored) total incomes and expenses by user id in a given month
 * @param id 
 * @param monthField 
 * @param yearField 
 * @returns 
 */
export async function getMonthPlanning(id, monthField, yearField): Promise<MonthPlanning[]> {
    await connect();
    const year = parseInt(yearField)
    const month = parseInt(monthField)

    const firstDay = new Date(`${year}-${month}-01`)
    const lastDay = (month === 12) ? ( new Date(`${year + 1}-01-01`) ) : ( new Date(`${year}-${month + 1}-01`) )

    const result = await TransactionModel.aggregate([
            { $match: { userId: new Types.ObjectId(id), _isDeleted: { $ne: true }, ignored: { $ne: true }, "category.ignored": false , date: { $gte: firstDay, $lt: lastDay } } },
            {
                $group :
                  {
                    _id : "$type",
                    totalAmount: { $sum: "$amount" }
                  }
            }
          ]) as MonthPlanning[];
    

    await disconnect();
    return result;
}

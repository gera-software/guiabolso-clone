import { Handler } from "@netlify/functions";
import * as TransactionRepository from '../repositories/transactionRepository'
import { Transaction } from "../types";

const handler :Handler = async (event, context) => {
    const userId = event.queryStringParameters?.id
    const monthField = event.queryStringParameters?.month
    const yearField = event.queryStringParameters?.yearField
    
    const transactions: Transaction[] = await TransactionRepository.fetchByUser(userId, monthField, yearField)
    
    return {
        statusCode: 200,
        body: JSON.stringify(transactions),
    };
}

export { handler };
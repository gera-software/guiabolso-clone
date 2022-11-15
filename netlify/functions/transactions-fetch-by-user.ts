import { Handler } from "@netlify/functions";
import * as TransactionRepository from '../repositories/transactionRepository'
import { Transaction } from "../types";

const handler :Handler = async (event, context) => {
    const userId = event.queryStringParameters?.id
    const transactions: Transaction[] = await TransactionRepository.fetchByUser(userId)
    
    return {
        statusCode: 200,
        body: JSON.stringify(transactions),
    };
}

export { handler };
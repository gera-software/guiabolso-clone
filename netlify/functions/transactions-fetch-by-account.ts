import { Handler } from "@netlify/functions";
import * as TransactionRepository from '../repositories/transactionRepository'
import { Transaction } from "../types";

const handler :Handler = async (event, context) => {
    const accountId = event.queryStringParameters?.id
    const transactions: Transaction[] = await TransactionRepository.fetchByAccount(accountId)
    
    return {
        statusCode: 200,
        body: JSON.stringify(transactions),
    };
}

export { handler };
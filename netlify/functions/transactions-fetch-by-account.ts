import { Handler } from "@netlify/functions";
import * as TransactionRepository from '../repositories/transactionRepository'
import { TransactionSummary } from "../types";

const handler :Handler = async (event, context) => {
    const accountId = event.queryStringParameters?.id
    const monthField = event.queryStringParameters?.month
    const yearField = event.queryStringParameters?.year
    const transactions: TransactionSummary[] = await TransactionRepository.fetchByAccount(accountId, monthField, yearField)
    
    return {
        statusCode: 200,
        body: JSON.stringify(transactions),
    };
}

export { handler };
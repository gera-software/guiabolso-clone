import { Handler } from "@netlify/functions";
import * as TransactionRepository from '../repositories/transactionRepository'
import * as AccountRepository from '../repositories/accountRepository'
import { Transaction } from "../types";

const handler :Handler = async (event, context) => {
    const transactionId = event.queryStringParameters?.id
    const transaction: Transaction | null = await TransactionRepository.remove(transactionId)
    const account = await AccountRepository.subtractFromBalance('' + transaction?.accountId.toString(), transaction?.amount.valueOf());
    console.log(account)
    
    return {
        statusCode: 200,
        body: JSON.stringify(transaction),
    };
}

export { handler };
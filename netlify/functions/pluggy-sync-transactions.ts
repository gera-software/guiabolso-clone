import { Handler } from "@netlify/functions";
import * as TransactionRepository from "../repositories/transactionRepository";
import * as AccountRepository from "../repositories/accountRepository";
import pluggy from 'pluggy-sdk'
import PluggyDataProvider from '../config/pluggyDataProvider'
import { AccountSyncType, CurrencyCodes, Transaction, TransactionType } from "../types";


const handler :Handler = async (event, context) => {
 
    console.log(event.queryStringParameters)

    const accountId = event.queryStringParameters?.accountId ?? ''
    // const pageSize = +(event.queryStringParameters?.pageSize ?? 20)
    const from = event.queryStringParameters?.from ?? '' // 2022-11-01

    const account = await AccountRepository.getById(accountId)
    console.log(account)

    let pluggyTransactions: pluggy.Transaction[] = [];
    let transactions: Transaction[] = []

    if(account) {
        const pluggyAccountId = account.pluggyAccountId ?? ''
    
        try {
            const provider = new PluggyDataProvider()
            pluggyTransactions = await provider.fetchTransactions(pluggyAccountId, from)
            console.log(pluggyTransactions.length)

            transactions = pluggyTransactions.map(transaction => ({
                pluggyTransactionId: transaction.id,
                syncType: AccountSyncType.AUTOMATIC,
                descriptionOriginal: transaction.description,
                amount: Math.trunc(transaction.amount * 100),
                currencyCode: CurrencyCodes.BRL,
                date: transaction.date,
                type: transaction.amount >= 0 ? TransactionType.INCOME : TransactionType.EXPENSE,
                status: transaction.status,
                ignored: false,
                _isDeleted: false,
                accountId: account._id,
                userId: account.userId,
            }) as Transaction)

        } catch(err) {
            console.error(err)
            return {
                statusCode: 400,
                body: JSON.stringify(err),
            };
        }
    }






    // let response;

    // try {
    //     const client = new pluggy.PluggyClient({
    //         clientId: process.env.VITE_PLUGGY_CLIENT_ID ?? '',
    //         clientSecret: process.env.VITE_PLUGGY_CLIENT_SECRET ?? '',
    //     });

    //     let page = 1
    //     let totalPages = 1
    //     do {
    //         response = await client.fetchTransactions(
    //             pluggyAccountId,
    //             {
    //                 from,
    //                 pageSize,
    //                 page,
    //             })  
    
    //         transactions.push(...response.results)
    //         // console.log(response.results);
    //         // console.log(response.total)
    //         // console.log(response.totalPages)
    //         // console.log(response.page)

    //         totalPages = +response.totalPages
    //         page = +response.page + 1
    //     } while(page <= totalPages)

        
        // console.log(transactions)
        // console.log(transactions.length)
        // console.log(accountId)
        // await TransactionRepository.batchUpdate(accountId, 2022, 11)


    // } catch(err) {
    //     console.error(err)
    //     return {
    //         statusCode: 400,
    //         body: JSON.stringify(err),
    //     };
    // }

    return {
        statusCode: 200,
        body: JSON.stringify(transactions),
    };


}

export { handler };
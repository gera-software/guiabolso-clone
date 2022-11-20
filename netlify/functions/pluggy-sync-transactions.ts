import { Handler } from "@netlify/functions";
import * as TransactionRepository from "../repositories/transactionRepository";
import * as AccountRepository from "../repositories/accountRepository";
import pluggy from 'pluggy-sdk'
import PluggyDataProvider from '../config/pluggyDataProvider'


const handler :Handler = async (event, context) => {
 
    console.log(event.queryStringParameters)

    const accountId = event.queryStringParameters?.accountId ?? ''
    // const pageSize = +(event.queryStringParameters?.pageSize ?? 20)
    const from = event.queryStringParameters?.from ?? '' // 2022-11-01

    const account = await AccountRepository.getById(accountId)
    console.log(account)

    let transactions: pluggy.Transaction[] = [];

    if(account) {
        const pluggyAccountId = account.pluggyAccountId ?? ''
    
        try {
            const provider = new PluggyDataProvider()
            transactions = await provider.fetchTransactions(pluggyAccountId, from)
            console.log(transactions.length)
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
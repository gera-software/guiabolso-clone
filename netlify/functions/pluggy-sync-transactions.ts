import { Handler } from "@netlify/functions";

const handler :Handler = async (event, context) => {
 
    console.log(event.queryStringParameters)
    const pluggy = require('pluggy-sdk');

    const pageSize = +(event.queryStringParameters?.pageSize ?? 20)
    const from = event.queryStringParameters?.from

    let transactions:Object[] = []

    let response;

    try {
        const client = new pluggy.PluggyClient({
            clientId: process.env.VITE_PLUGGY_CLIENT_ID,
            clientSecret: process.env.VITE_PLUGGY_CLIENT_SECRET,
        });

        let page = 1
        let totalPages = 1
        do {
            response = await client.fetchTransactions(
                event.queryStringParameters?.accountId ?? '',
                {
                    from,
                    pageSize,
                    page,
                })  
    
            transactions.push(...response.results)
            // console.log(response.results);
            // console.log(response.total)
            // console.log(response.totalPages)
            // console.log(response.page)

            totalPages = +response.totalPages
            page = +response.page + 1
        } while(page <= totalPages)

        
        console.log(transactions)
        console.log(transactions.length)

    } catch(err) {
        console.error(err)
        return {
            statusCode: 400,
            body: JSON.stringify(err),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(transactions),
    };


}

export { handler };
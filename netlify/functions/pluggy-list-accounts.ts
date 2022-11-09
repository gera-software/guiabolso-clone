import { Handler } from "@netlify/functions";

const handler :Handler = async (event, context) => {
 
    const pluggy = require('pluggy-sdk');

    let accounts;

    try {
        const client = new pluggy.PluggyClient({
            clientId: process.env.VITE_PLUGGY_CLIENT_ID,
            clientSecret: process.env.VITE_PLUGGY_CLIENT_SECRET,
        });

        accounts = await client.fetchAccounts(process.env.VITE_PLUGGY_NUBANK_ID)  
        console.log(accounts);

    } catch(err) {
        console.error(err)
        return {
            statusCode: 400,
            body: JSON.stringify(err),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(accounts),
    };


}

export { handler };
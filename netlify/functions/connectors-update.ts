import { Handler } from "@netlify/functions";
import * as SynchronizationRepository from '../repositories/synchronizationRepository'
import { Synchronization } from "../types";

const handler :Handler = async (event, context) => {
 
    console.log(event.queryStringParameters)
    const userId = event.queryStringParameters?.userId ?? ''


    const results: Synchronization[] = await SynchronizationRepository.fetchByUserId(userId)
    // TODO loop
    results[0]



    // let item;


    // try {
    //     const client = new pluggy.PluggyClient({
    //         clientId: process.env.VITE_PLUGGY_CLIENT_ID,
    //         clientSecret: process.env.VITE_PLUGGY_CLIENT_SECRET,
    //     });

    //     item = await client.fetchItem(event.queryStringParameters?.itemId ?? '')  
    //     console.log(item);

    // } catch(err) {
    //     console.error(err)
    //     return {
    //         statusCode: 400,
    //         body: JSON.stringify(err),
    //     };
    // }

    return {
        statusCode: 200,
        body: JSON.stringify(results),
    };


}

export { handler };
import { Handler } from "@netlify/functions";
import * as AccountRepository from '../repositories/accountRepository'
import { Account } from "../types";

const handler :Handler = async (event, context) => {
  
    const accounts: Account[] = await AccountRepository.fetchAll()
    
    return {
        statusCode: 200,
        body: JSON.stringify(accounts),
    };
}

export { handler };
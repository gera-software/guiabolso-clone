import { Handler } from "@netlify/functions";
import * as AccountRepository from '../repositories/accountRepository'
import { Account } from "../types";

const handler :Handler = async (event, context) => {
  // TODO hardcoded id
    const accounts: Account[] = await AccountRepository.fetchByUserId('6371600bc4021d373d3ace59')
    
    return {
        statusCode: 200,
        body: JSON.stringify(accounts),
    };
}

export { handler };
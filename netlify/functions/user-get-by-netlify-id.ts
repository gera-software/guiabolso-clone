import { Handler } from "@netlify/functions";
import * as UserRepository from '../repositories/userRepository'
import { User } from "../types";

const handler :Handler = async (event, context) => {
    const id = event.queryStringParameters?.netlifyId

    console.log(id)
  
    // TODO hardcoded id
    const user: User | null = await UserRepository.getByNetlifyId(id)
    
    return {
        statusCode: 200,
        body: JSON.stringify(user),
    };
}

export { handler };
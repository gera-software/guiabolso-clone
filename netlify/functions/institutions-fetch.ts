import { Handler } from "@netlify/functions";
import { fetchAll } from '../repositories/institutionRepository'

const handler :Handler = async (event, context) => {
  
    const institutions = await fetchAll()
    
    return {
        statusCode: 200,
        body: JSON.stringify(institutions),
    };
}

export { handler };
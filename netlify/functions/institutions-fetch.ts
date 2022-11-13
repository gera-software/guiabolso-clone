import { Handler } from "@netlify/functions";
import Institution from '../schemas/InstitutionSchema'
import { connect, disconnect } from '../config/database'

const handler :Handler = async (event, context) => {
    await connect()
  
    const institutions = await Institution.find()

    await disconnect()
    
    return {
        statusCode: 200,
        body: JSON.stringify(institutions),
    };
}

export { handler };
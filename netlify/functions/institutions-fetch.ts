import { Handler } from "@netlify/functions";
import mongoose from 'mongoose';
import Institution from '../schemas/InstitutionSchema'

const mongoUri = process.env.VITE_MONGO_URI ?? ''

const handler :Handler = async (event, context) => {
    console.log('[connecting] ' + mongoUri)
    await mongoose.connect(mongoUri);
  
    const institutions = await Institution.find()

    await mongoose.disconnect()
    
    return {
        statusCode: 200,
        body: JSON.stringify(institutions),
    };
}

export { handler };
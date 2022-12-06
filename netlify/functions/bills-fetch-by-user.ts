import { Handler } from "@netlify/functions";
import * as CalendarBillRepository from '../repositories/calendarBillRepository'
import { CalendarBill } from "../types";

const handler :Handler = async (event, context) => {
    const userId = event.queryStringParameters?.id
    const monthField = event.queryStringParameters?.month
    const yearField = event.queryStringParameters?.year

    const bills: CalendarBill[] = await CalendarBillRepository.fetchByUser(userId, monthField, yearField)
    
    return {
        statusCode: 200,
        body: JSON.stringify(bills),
    };
}

export { handler };
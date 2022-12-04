import { Handler } from "@netlify/functions";
import * as DashboardRepository from '../repositories/dashboardRepository'

type item = {
    name: String,
    primaryColor: String,
    amount: number,
} 

const handler :Handler = async (event, context) => {
    const userId = event.queryStringParameters?.id
    const monthField = event.queryStringParameters?.month
    const yearField = event.queryStringParameters?.year
    const spendingsByCategories = await DashboardRepository.getHighestMonthlySpendings(userId, monthField, yearField)
    
    const result: item[] = [];

    const first = spendingsByCategories.shift()
    result.push({
        name: first?.category.name ?? '',
        primaryColor: first?.category.primaryColor ?? 'gray',
        amount: Math.abs(first?.totalAmount ?? 0),
    })

    const second = spendingsByCategories.shift()
    result.push({
        name: second?.category.name ?? '',
        primaryColor: second?.category.primaryColor ?? 'gray',
        amount: Math.abs(second?.totalAmount ?? 0),
    })
    
    const third = spendingsByCategories.shift()
    result.push({
        name: third?.category.name ?? '',
        primaryColor: third?.category.primaryColor ?? 'gray',
        amount: Math.abs(third?.totalAmount ?? 0),
    })

    const others = spendingsByCategories.reduce((accumulator, category) => accumulator + category.totalAmount, 0)

    result.push({
        name: 'Outras categorias',
        primaryColor: 'gray',
        amount: Math.abs(others ?? 0),
    })

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}

export { handler };
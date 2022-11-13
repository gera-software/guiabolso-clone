import { connect, disconnect } from '../config/database'
import Institution from '../schemas/InstitutionSchema'

export async function fetchAll() {
    await connect()
    const result = await Institution.find()
    await disconnect()
    return result
}

export async function updateAll(connectors) {
    await connect()
    const result = await Institution.bulkWrite(connectors);
    await disconnect()
    return result
}
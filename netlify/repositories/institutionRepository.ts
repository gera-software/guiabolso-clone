import { connect, disconnect } from '../config/database'
import Institution from '../schemas/InstitutionSchema'

export async function fetchAll() {
    await connect()
    const institutions = await Institution.find()
    await disconnect()
    return institutions
}
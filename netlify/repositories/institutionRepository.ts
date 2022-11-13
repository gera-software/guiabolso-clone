import { connect, disconnect } from "../config/database";
import InstitutionModel, { Institution } from "../schemas/InstitutionModel";
// import { Institution } from '../types'

export async function fetchAll() {
    await connect();
    const result = await InstitutionModel.find();
    await disconnect();
    return result;
}

export async function updateAll(institution: Institution[]) {
    const operations = institution.map((institution) => ({
        updateOne: {
            filter: { pluggyConnectorId: institution.pluggyConnectorId },
            update: institution,
            upsert: true,
        },
    }));

    await connect();
    const result = await InstitutionModel.bulkWrite(operations);
    await disconnect();
    return result;
}

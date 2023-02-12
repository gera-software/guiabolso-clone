import * as SynchronizationRepository from "../repositories/synchronizationRepository";
import { Synchronization } from "../types";


export async function update(sync: Synchronization) {
    return await SynchronizationRepository.updateOne(sync)
}
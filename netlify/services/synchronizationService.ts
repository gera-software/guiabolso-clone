import * as SynchronizationRepository from "../repositories/synchronizationRepository";
import { Synchronization } from "../types";


/**
 * Inicia o processo de sincronização das transações de uma conta com o provedor de dados
 * 
 * - importa as transações recentes (desde a data da ultima sincronização)
 * - atualiza o balanço da conta
 * @param sync 
 * @returns 
 */
export async function start(sync: Synchronization) {
    return await SynchronizationRepository.updateOne(sync)
}
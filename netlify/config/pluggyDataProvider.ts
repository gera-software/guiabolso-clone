import pluggy from "pluggy-sdk"
import { DataProvider, Institution, InstitutionType } from '../types'

class PluggyDataProvider implements DataProvider {
    private client : pluggy.PluggyClient

    constructor() {
        this.client = new pluggy.PluggyClient({
            clientId: process.env.VITE_PLUGGY_CLIENT_ID ?? '',
            clientSecret: process.env.VITE_PLUGGY_CLIENT_SECRET ?? '',
        });
    }

    async createConnectToken(itemId: string | undefined) {
        return this.client.createConnectToken(itemId)
    }

    /**
     * Retorna apenas os conectores online disponíveis para conexão no momento
     * @returns 
     */
    async fetchInstitutions(): Promise<Institution[]> {
        console.log('[Pluggy] fetchInstitutions...')
        return this.client
                .fetchConnectors()
                .then((response) => response.results)
                .then((connectors) => {
                    return connectors.map((connector) => ({
                        pluggyConnectorId: connector.id,
                        name: connector.name,
                        imageUrl: connector.imageUrl,
                        primaryColor: "#" + connector.primaryColor,
                        type: connector.type as InstitutionType,
                    }));
                })
    }

    /**
     * Retorna todas as transações de uma account, a partir de uma determinada data
     * @param pluggyAccountId 
     * @param from 
     * @returns 
     */
    async fetchTransactions(pluggyAccountId: string, from: string ): Promise<pluggy.Transaction[]> {
        console.log('[Pluggy] fetchTransactions...')

        // const pluggyAccountId = '100e848a-22e7-491e-bebc-a3c489df7893'
        const pageSize = 10
        // const from = '2022-11-01'

        let transactions: pluggy.Transaction[]  = []

        let response;

        let page = 1
        let totalPages = 1
        do {
            response = await this.client.fetchTransactions(
                pluggyAccountId,
                {
                    from,
                    pageSize,
                    page,
                }
            )  
    
            transactions.push(...response.results)
            // console.log(response.results);
            // console.log(response.total)
            // console.log(response.totalPages)
            // console.log(response.page)

            totalPages = +response.totalPages
            page = +response.page + 1
        } while(page <= totalPages)

        return transactions
    }

    /**
     * Request an item to start update process in background
     * @param id 
     * @returns 
     */
    async updateItem(id: string): Promise<pluggy.Item> {
        console.log('[Pluggy] updateItems...')
        return this.client
            .updateItem(id)
    }
}

export default PluggyDataProvider
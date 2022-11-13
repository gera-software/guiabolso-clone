import pluggy from "pluggy-sdk"
import { DataProvider, Institution } from '../types'

class PluggyDataProvider implements DataProvider {
    private client : pluggy.PluggyClient

    constructor() {
        this.client = new pluggy.PluggyClient({
            clientId: process.env.VITE_PLUGGY_CLIENT_ID ?? '',
            clientSecret: process.env.VITE_PLUGGY_CLIENT_SECRET ?? '',
        });
    }

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
                    }));
                })
    }
}

export default PluggyDataProvider
import { Handler } from "@netlify/functions";
import { updateAll } from '../repositories/institutionRepository'
import PluggyDataProvider from '../config/dataProvider'

const handler: Handler = async (event, context) => {

    let connectors;
    let res;

    try {
        const provider = new PluggyDataProvider()

        connectors = await provider.fetchInstitutions()
            .then(connectors => {
                return connectors.map(connector => (
                    {
                        updateOne: {
                          filter: { pluggyConnectorId: connector.pluggyConnectorId },
                          update: connector,
                          upsert: true,
                        }
                    }
                ))
            })

        res = await updateAll(connectors);

    } catch (err) {
        console.error(err);

        return {
            statusCode: 400,
            body: JSON.stringify(err),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(res),
    };
};

export { handler };

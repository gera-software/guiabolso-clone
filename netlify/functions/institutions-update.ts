import { Handler } from "@netlify/functions";
import { updateAll } from '../repositories/institutionRepository'


const handler: Handler = async (event, context) => {

    const pluggy = require("pluggy-sdk");

    let connectors;
    let res;

    try {
        const client = new pluggy.PluggyClient({
            clientId: process.env.VITE_PLUGGY_CLIENT_ID,
            clientSecret: process.env.VITE_PLUGGY_CLIENT_SECRET,
        });

        connectors = await client
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

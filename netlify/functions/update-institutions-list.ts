import { Handler } from "@netlify/functions";
import mongoose from "mongoose";

const InstitutionSchema = new mongoose.Schema({
    pluggyConnectorId: Number,
    name: String,
    imageUrl: String,
    primaryColor: String,
});

const Institution = mongoose.model("institutions", InstitutionSchema);

const mongoUri =
    process.env.VITE_MONGO_URI || "mongodb://localhost:27017/guiabolso";

const handler: Handler = async (event, context) => {
    console.log("[connecting] " + mongoUri);

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

        await mongoose.connect(mongoUri);

        res = await Institution.bulkWrite(connectors);

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

import pluggy from "pluggy-sdk"

function createPluggy() {
    const client = new pluggy.PluggyClient({
        clientId: process.env.VITE_PLUGGY_CLIENT_ID ?? '',
        clientSecret: process.env.VITE_PLUGGY_CLIENT_SECRET ?? '',
    });

    return client
}

export async function fetchInstitutions() {
    const client = createPluggy()
    
    return client
            .fetchConnectors()
            .then((response) => response.results)
}
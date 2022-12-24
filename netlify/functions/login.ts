import { Handler } from "@netlify/functions";
import jwt from 'jsonwebtoken'

const handler: Handler = async (event, context) => {

    if (!event.body) {
        return {
            statusCode: 400,
        };
    }

    const data = JSON.parse(event.body);


    // TODO authenticate user

    const email = data.email
    const password = data.password

    const user = {
        _id: '6371600bc4021d373d3ace59',
        name: 'asdrubal',
        email: 'gilmar-andrade@outlook.com',
    }

    const accessToken = jwt.sign(user, process.env.VITE_ACCESS_TOKEN_SECRET)

    return {
        statusCode: 200,
        body: JSON.stringify({accessToken}),
    };
}

export { handler };

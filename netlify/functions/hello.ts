import { Handler } from "@netlify/functions";

const handler :Handler = async (event, context) => {
  // your server-side functionality
  console.log(event, context)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };
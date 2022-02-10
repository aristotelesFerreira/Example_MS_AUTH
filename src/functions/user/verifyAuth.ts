import "source-map-support/register";
import "reflect-metadata";

import { middyfy } from "../../utility/lambda";

import { APIGatewayAuthorizerEvent } from "aws-lambda";
import JWT from "jsonwebtoken";

import { generatePolicy } from "src/helpers/generatePolicy";

const main = async (event: APIGatewayAuthorizerEvent) => {
  const deny = () => {
    return generatePolicy("MS_AUTH", {}, "Deny", event.methodArn);
  };
  try {
    const token = event.authorizationToken.split(" ")[1];

    const verifyToken = await JWT.verify(token, process.env.KEY);

    return generatePolicy(
      verifyToken.id.toString(),
      {},
      "Allow",
      event.methodArn
    );
  } catch (error) {
    console.log(error);
    return deny();
  }
};

export const handler = middyfy(main);

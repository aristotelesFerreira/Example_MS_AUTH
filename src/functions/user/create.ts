import "source-map-support/register";
import "reflect-metadata";

import { middyfy } from "../../utility/lambda";
import { UserModel } from "src/models/userModel";

import { APIGatewayProxyResult, Context } from "aws-lambda";
import { IHandlerInput } from "src/utility/types";
import { notifyNewUser } from "src/helpers/snsAWS";

const bcrypt = require("bcryptjs");

const main = async (
  event: IHandlerInput,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;

    const salt = bcrypt.genSaltSync(6);

    const hash_password = await bcrypt.hash(event.body.password, salt);

    const userResult = await UserModel.create({
      fullName: event.body.fullName,
      email: event.body.email,
      password: hash_password,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(userResult),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};

export const handler = middyfy(main);

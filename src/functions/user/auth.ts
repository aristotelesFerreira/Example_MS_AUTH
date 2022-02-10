import "source-map-support/register";
import "reflect-metadata";

import { middyfy } from "../../utility/lambda";
import { UserModel } from "src/models/userModel";

import { APIGatewayProxyResult, Context } from "aws-lambda";
import JWT from "jsonwebtoken";
import { IHandlerInput } from "src/utility/types";

const bcrypt = require("bcryptjs");

const main = async (
  event: IHandlerInput,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;

    const user = await UserModel.findOne({
      where: { email: event.body.email },
    });

    const compare_hash = await bcrypt.compare(
      event.body.password,
      user.password
    );

    if (compare_hash === false) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "Senha incorreta" }),
      };
    }
    const token = JWT.sign({ id: user.id }, process.env.KEY, {
      expiresIn: "1d",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        token,
        user,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error,
      }),
    };
  }
};

export const handler = middyfy(main);

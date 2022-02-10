export type IPolicy = {
  principalId: string;
  policyDocument: {
    Version: "2012-10-17";
    Statement: {
      Action: string;
      Effect: "Allow" | "Deny";
      Resource: string;
    }[];
  };
  context: {
    [k: string]: unknown;
  };
};

export const generatePolicy = (
  principalId: string,
  context: { [k: string]: unknown } = {},
  effect: "Allow" | "Deny" = "Deny",
  resourceArn = ""
): IPolicy => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resourceArn,
      },
    ],
  },
  context,
});

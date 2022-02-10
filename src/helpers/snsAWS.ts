import * as AWS from "@aws-sdk/client-sns";
const client = new AWS.SNS({ region: "us-east-1" });

export const notifyNewUser = async (data) => {
  try {
    let params = {
      Message: JSON.stringify({
        event: "user-created",
        body: data,
      }),
      TopicArn: "ARN SNS_TOPIC",
    };

    await client.publish(params);
  } catch (err) {
    console.log("SNS ERROR", err);
  }
};

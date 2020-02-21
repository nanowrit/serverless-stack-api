import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.climaxTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      climaxId: uuid.v1(),
      struggle: data.struggle,
      doubt: data.doubt,
      unexpected: data.unexpected,
      climax: data.climax,
      poeticJustice: data.poeticJustice,
      poeticReward: data.poeticReward,
      wrapUp: data.wrapUp,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.recommitmentTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      recommitmentId: uuid.v1(),
      goal: data.goal,
      conflictField: data.conflictField,
      revelation: data.revelation,
      praiseTheEnemy: data.praiseTheEnemy,
      doOrDie: data.doOrDie,
      crossThreshold: data.crossThreshold,
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
import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.fillerTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      fillerId: uuid.v1(),
      goal: data.goal,
      conflictField: data.conflictField,
      disaster: data.disaster,
      dilemma: data.dilemma,
      decision: data.decision,
      actionField: data.actionField,
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
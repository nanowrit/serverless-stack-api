import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.mirrorsTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      mirrorId: uuid.v1(),
      goal: data.goal,
      conflictField: data.conflictField,
      disaster: data.disaster,
      mirrorMoment: data.mirrorMoment,
      oneMoreTime: data.oneMoreTime,
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
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.fillerTableName,

    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      fillerId: event.pathParameters.id,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET goal = :goal, conflictField = :conflictField, disaster = :disaster, dilemma = :dilemma, decision = :decision, actionField = :actionField, attachment = :attachment",
    ExpressionAttributeValues: {
      ":goal": data.goal || null,
      ":conflictField": data.conflictField || null,
      ":disaster": data.disaster || null,
      ":dilemma": data.dilemma || null,
      ":decision": data.decision || null,
      ":actionField": data.actionField || null,
      ":attachment": data.attachment || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
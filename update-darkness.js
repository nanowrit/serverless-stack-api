import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.darknessTableName,

    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      darknessId: event.pathParameters.id,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET goal = :goal, conflictField = :conflictField, ultimateDisaster = :ultimateDisaster, darkestMoment = :darkestMoment, oneChance = :oneChance, doAndDie = :doAndDie, attachment = :attachment",
    ExpressionAttributeValues: {
      ":goal": data.goal || null,
      ":conflictField": data.conflictField || null,
      ":ultimateDisaster": data.ultimateDisaster || null,
      ":darkestMoment": data.darkestMoment || null,
      ":oneChance": data.oneChance || null,
      ":doAndDie": data.doAndDie || null,
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
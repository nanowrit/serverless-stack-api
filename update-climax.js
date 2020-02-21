import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.climaxTableName,

    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      climaxId: event.pathParameters.id,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET struggle = :struggle, doubt = :doubt, unexpected = :unexpected, climax = :climax, poeticJustice = :poeticJustice, poeticReward = :poeticReward, wrapUp = :wrapUp, attachment = :attachment",
    ExpressionAttributeValues: {
      ":struggle": data.struggle || null,
      ":doubt": data.doubt || null,
      ":unexpected": data.unexpected || null,
      ":climax": data.climax || null,
      ":poeticJustice": data.poeticJustice || null,
      ":poeticReward": data.poeticReward || null,
      ":wrapUp": data.wrapUp || null,
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
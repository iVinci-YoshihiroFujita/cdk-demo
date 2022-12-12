import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import { App, CfnParameter, Duration, Stack, StackProps } from '@aws-cdk/core';

export class CdkDemoStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const name = 'sampleGet'
    const sampleGetLambda = new lambda.Function(this, name, {
      description: 'sample lambda for study',
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
          exports.handler = (event, context) => {
            console.log(event);

            const response = {
              statusCode: 200,
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              body: {
                success: true,
                message: "hello from cdk lambda"
              }
            };
            
            console.log(response);
            context.succeed(response);
          };
      `),
      timeout: Duration.seconds(60)
    });
  }
}

import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import { App, Duration, Stack, StackProps } from '@aws-cdk/core';

export class CdkDemoStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const sampleGetLambda = new lambda.Function(this, 'sampleGet', {
      description: 'sample lambda for study',
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
          exports.handler = async (event) => {
            console.log(event);

            const response = {
              statusCode: 200,
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              body: JSON.stringify({
                success: true,
                message: "hello from cdk lambda"
              })
            };
            
            console.log(response);
            return response;
          };
      `),
      timeout: Duration.seconds(60)
    });

    // const api = new apigateway.RestApi(this, 'SampleRestApi', { cloudWatchRole: false });
    // api.root.addMethod('GET', new apigateway.LambdaIntegration(sampleGetLambda));
    
    // api.root.addResource('hoge').addMethod('GET', new apigateway.LambdaIntegration(hogeLambda);
  }
}

import * as apigateway from '@aws-cdk/aws-apigatewayv2-alpha'
import * as apigatewayIntegrations from '@aws-cdk/aws-apigatewayv2-integrations-alpha'
import { aws_lambda as lambda, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path'

export class MyappStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // lambda function
    const fn = new lambda.Function(this, 'Function', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda-handler')),
    });

    // httpApi
    const httpApi = new apigateway.HttpApi(this, 'HttpApi', {
      defaultIntegration: new apigatewayIntegrations.LambdaProxyIntegration({
        handler: fn,
      }),
    })

    new CfnOutput(this, 'FunctionArn', {
      value: fn.functionArn,
    })

    new CfnOutput(this, 'ApiEndpoint', {
      value: httpApi.apiEndpoint,
    })
  }
}

import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // JavaScriptで実装したLambda関数をデプロイ
    new lambda.Function(
      this,
      "JavaScriptHelloWorldLambdaFn",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        code: lambda.Code.fromAsset('lambda'),
        handler: "src/helloworld.handler",
      }
    );

    // NodejsFunctionコンストラクタはTypeScriptで実装したLambda関数を簡単にビルド・デプロイしてくれる
    new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "TypeScriptHelloWorldLambdaFn",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: "lambda/src/index.ts",
      }
    );

    // serverless-expressを使って複数のURLパス・HTTPメソッドを1つのLambda関数としてデプロイする & API Gateway経由で呼び出し
    // curl https://xxxx.execute-api.ap-northeast-1.amazonaws.com/api/kyo-no-gohan/:id
    const expresslambdaFn = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "ExpressLambdaFn",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: "lambda/src/express-handler.ts",
      }
    );
    // APIGW
    const api = new cdk.aws_apigateway.RestApi(this, "api", {
      deployOptions: {
        tracingEnabled: true,
        stageName: "api",
      },
    })
    api.root.addProxy({
      defaultIntegration: new cdk.aws_apigateway.LambdaIntegration(expresslambdaFn),
    })
  }
}

import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // NodejsFunctionコンストラクタはTypeScriptで実装したLambda関数を簡単にビルド・デプロイしてくれる
    const lambdaFunc = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "lambdaFunc",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: "lambda/src/index.ts",
      }
    );
  }
}

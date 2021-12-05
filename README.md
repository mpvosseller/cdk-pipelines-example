# Repo demonstrating sam-beta-cdk bugs when CDK app uses CDK Pipelines

This repo demonstrates [aws-sam-cli issue #3068](https://github.com/aws/aws-sam-cli/issues/3068). Specifically it shows how `sam-beta-cdk local invoke` can not find or invoke functions that are part of a typical CDK app that uses CDK Pipelines. Similarly `sam-beta-cdk local start-api` can not find and start HttpApis that are part of a typical CDK app that uses CDK Pipelines.

## Instructions

1) clone this repo
2) `npm install`
3) `sam-beta-cdk local invoke` and observe it fails with 
> Error: You must provide a function logical ID when there are more than one functions in your template. Possible options in your template: []
4) `sam-beta-cdk local start-api` and observe it fails with
> Error: You must provide a function logical ID when there are more than one functions in your template. Possible options in your template: []

# Deploying

If you want to actually deploy this to your account you will need to fork this repo and modify the GitHub paramaters in [lib/myapp-pipeline-stack.ts](lib/myapp-pipeline-stack.ts)


# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run clean`   remove all generated files
 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

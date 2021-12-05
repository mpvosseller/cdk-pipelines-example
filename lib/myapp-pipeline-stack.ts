import { 
  pipelines as pipelines,
  SecretValue,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import { MyAppStage } from "./myapp-stage";

export class MyappPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // to reproduce with your account update these values
    const githubOwner = "mpvosseller";
    const githubRepo = "cdk-pipelines-example";
    const branch = "main";
    // create a "plaintext" secret in secrets manager with your github token 
    const githubAccessToken = SecretValue.secretsManager('github-token-2021-07-06')     

    const pipeline = new pipelines.CodePipeline(this, "CodePipeline", {
      synth: new pipelines.ShellStep("Synth", {
        input: pipelines.CodePipelineSource.gitHub(
          `${githubOwner}/${githubRepo}`,
          branch,
          {
            authentication: githubAccessToken,
          }
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    pipeline.addStage(
      new MyAppStage(this, "Prod")
    );
  }
}

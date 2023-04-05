import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Vpc, SubnetType } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class VpcPrivateSubnetStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create VPC
    const vpc = new Vpc(this, "VPC", {
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "Public",
          subnetType: SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "Private",
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
      natGateways: 1,
    });

    // Output VPC ID
    new CfnOutput(this, "VpcId", {
      value: vpc.vpcId,
      description: "The VPC ID",
    });

    // Output Private Subnet IDs
    vpc.privateSubnets.forEach((subnet, index) => {
      new CfnOutput(this, `PrivateSubnetId${index}`, {
        value: subnet.subnetId,
        description: `The ID of the private subnet ${index}`,
      });
    });
  }
}

import {Graph} from '@antv/x6'
import {NodeType} from "@/node/node-type";
import {TfProvider} from "@/node/tf-provider";
import {TfCore} from "@/node/tf-core";
import {TfData} from "@/node/tf-data";
import {TfLocals} from "@/node/tf-locals";
import {TfModule} from "@/node/tf-module";
import {TfOutput} from "@/node/tf-output";
import {TfResource} from "@/node/tf-resource";
import {TfVariable} from "@/node/tf-variable";

// TODO: 自动扫描目录下的类型
const nodeTypes: NodeType[] = [
  TfCore.TYPE,
  TfData.TYPE,
  TfLocals.TYPE,
  TfModule.TYPE,
  TfOutput.TYPE,
  TfProvider.TYPE,
  TfResource.TYPE,
  TfVariable.TYPE
]

export function registerNodes() {
  nodeTypes.forEach(type => {
    Graph.registerNode(type.name, type.conf, true);
  });
}

const awsResourceNodes = [
  {
    label: 'EC2 Instance',
    tfType: 'aws_instance',
    icon: '/aws-icons/ec2.svg',
  },
  {
    label: 'S3 Bucket',
    tfType: 'aws_s3_bucket',
    icon: '/aws-icons/s3.svg',
  },
  {
    label: 'VPC',
    tfType: 'aws_vpc',
    icon: '/aws-icons/vpc.svg',
  },
  {
    label: 'Lambda',
    tfType: 'aws_lambda_function',
    icon: '/aws-icons/lambda.svg',
  },
  {
    label: 'RDS Instance',
    tfType: 'aws_db_instance',
    icon: '/aws-icons/rds.svg',
  },
  {
    label: 'Security Group',
    tfType: 'aws_security_group',
    icon: '/aws-icons/sg.svg',
  },
  {
    label: 'IAM Role',
    tfType: 'aws_iam_role',
    icon: '/aws-icons/iam.svg',
  },
  {
    label: 'CloudWatch',
    tfType: 'aws_cloudwatch_log_group',
    icon: '/aws-icons/cloudwatch.svg',
  },
  {
    label: 'ALB',
    tfType: 'aws_lb',
    icon: '/aws-icons/alb.svg',
  },
  {
    label: 'Subnet',
    tfType: 'aws_subnet',
    icon: '/aws-icons/subnet.svg',
  },
  {
    label: 'Route Table',
    tfType: 'aws_route_table',
    icon: '/aws-icons/route.svg',
  },
  {
    label: 'EBS Volume',
    tfType: 'aws_ebs_volume',
    icon: '/aws-icons/ebs.svg',
  },
]

export function registerAwsNodeTypes() {
  awsResourceNodes.forEach((item) => {
    Graph.registerNode(
      `aws-${item.tfType}`,
      {
        inherit: 'rect',
        width: 160,
        height: 60,
        attrs: {
          body: {
            rx: 8,
            ry: 8,
            stroke: '#C1C7CD',
            fill: '#F7F9FA',
          },
          image: {
            'xlink:href': item.icon,
            x: 8,
            y: 8,
            width: 24,
            height: 24,
          },
          label: {
            refX: 40,
            refY: 20,
            fontSize: 14,
            fill: '#333',
            textAnchor: 'start',
            textVerticalAnchor: 'middle',
            text: item.label,
          },
        },
        data: {
          tfType: item.tfType,
        },
      },
      true
    )
  })
}

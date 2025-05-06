import {RedisProp} from "@/node/redis-props";
import {MySQLProp} from "@/node/mysql-props";

export enum NodeType {
  REDIS = "redis",
  MYSQL = "mysql",
}

export interface NodeProp {
  readonly type: NodeType;
  readonly icon: string;

  data(): NodeData;
}

export interface NodeData {
  module: any;
  name: string;
  fixed_value: Set<string>;
  text: any;
  type: NodeType;
}

export const nodes = new Map<NodeType, NodeProp>([
  [NodeType.REDIS, new RedisProp()],
  [NodeType.MYSQL, new MySQLProp()],
]);
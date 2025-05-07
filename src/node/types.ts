import {RedisProp} from "@/node/redis-props";
import {MySQLProp} from "@/node/mysql-props";
import {CellStatus} from "@/node/index";

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
  fixed_value: Set<string>;
  text: {
    [key: string]: string
  };
  type: NodeType;
  status: CellStatus;
}

export const nodes = new Map<NodeType, NodeProp>([
  [NodeType.REDIS, new RedisProp()],
  [NodeType.MYSQL, new MySQLProp()],
]);
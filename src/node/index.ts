import { Edge, Graph, Path } from "@antv/x6";
import DeploymentDagNode from "@/components/deployment-dag-node/index.vue";
import { register } from "@antv/x6-vue-shape";
import { RedisProp } from "@/node/redis-props";
import { MySQLProp } from "@/node/mysql-props";

// 元素校验状态
export enum CellStatus {
  DEFAULT = "default",
  SUCCESS = "success",
  ERROR = "error",
}

// 节点位置信息
export interface Position {
  x: number;
  y: number;
}

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
    [key: string]: string;
  };
  type: NodeType;
  status: CellStatus;
}

export const nodes = new Map<NodeType, NodeProp>([
  [NodeType.REDIS, new RedisProp()],
  [NodeType.MYSQL, new MySQLProp()],
]);

export class Variable {
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}

export const registerShapeType = () => {
  register({
    shape: "deployment-dag-node",
    width: 212,
    height: 48,
    component: DeploymentDagNode,
    // port默认不可见
    ports: {
      groups: {
        in: {
          position: {
            name: "right",
            args: {
              dx: -32,
            },
          },
          attrs: {
            circle: {
              r: 4,
              magnet: "passive",
              // magnet: true,
              stroke: "transparent",
              strokeWidth: 1,
              fill: "transparent",
            },
          },
        },

        out: {
          position: {
            name: "left",
          },

          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "transparent",
              strokeWidth: 1,
              fill: "transparent",
            },
          },
        },
      },
    },
  });

  // 注册连线
  Graph.registerConnector(
    "curveConnector",
    (sourcePoint, targetPoint) => {
      const hgap = Math.abs(targetPoint.x - sourcePoint.x);
      const path = new Path();
      path.appendSegment(
        Path.createSegment("M", sourcePoint.x + 4, sourcePoint.y)
      );
      path.appendSegment(
        Path.createSegment("L", sourcePoint.x - 12, sourcePoint.y)
      );
      // 水平三阶贝塞尔曲线
      path.appendSegment(
        Path.createSegment(
          "C",
          sourcePoint.x < targetPoint.x
            ? sourcePoint.x + hgap / 2
            : sourcePoint.x - hgap / 2,
          sourcePoint.y,
          sourcePoint.x < targetPoint.x
            ? targetPoint.x - hgap / 2
            : targetPoint.x + hgap / 2,
          targetPoint.y,
          targetPoint.x + 6,
          targetPoint.y
        )
      );
      path.appendSegment(Path.createSegment("L", targetPoint.x, targetPoint.y));

      return path.serialize();
    },
    true
  );

  Edge.config({
    markup: [
      {
        tagName: "path",
        selector: "wrap",
        attrs: {
          fill: "none",
          cursor: "pointer",
          stroke: "transparent",
          strokeLinecap: "round",
        },
      },
      {
        tagName: "path",
        selector: "line",
        attrs: {
          fill: "none",
          pointerEvents: "none",
        },
      },
    ],
    connector: { name: "curveConnector" },
    // connector: {name: 'straight'},
    attrs: {
      wrap: {
        connection: true,
        strokeWidth: 10,
        strokeLinejoin: "round",
      },
      line: {
        connection: true,
        stroke: "#A2B1C3",
        strokeWidth: 1,
        targetMarker: {
          name: "classic",
          size: 6,
        },
      },
    },
  });

  Graph.registerEdge("deployment-curve", Edge, true);
};

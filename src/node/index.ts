import {Edge, Graph, Node, Path, StringExt} from "@antv/x6";
import DeploymentDagNode from "@/components/DeploymentDagNode.vue";
import {register} from "@antv/x6-vue-shape";

// 节点类型
export enum NodeType {
  INPUT = 'INPUT', // 数据输入
  FILTER = 'FILTER', // 数据过滤
  JOIN = 'JOIN', // 数据连接
  UNION = 'UNION', // 数据合并
  AGG = 'AGG', // 数据聚合
  OUTPUT = 'OUTPUT', // 数据输出
}

// 元素校验状态
export enum CellStatus {
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error',
}

// 节点位置信息
export interface Position {
  x: number
  y: number
}

// 加工类型列表
export const PROCESSING_TYPE_LIST = [
  {
    type: NodeType.FILTER,
    name: '数据筛选',
  },
  {
    type: NodeType.JOIN,
    name: '数据连接',
  },
  {
    type: NodeType.UNION,
    name: '数据合并',
  },
  {
    type: NodeType.AGG,
    name: '数据聚合',
  },

  {
    type: NodeType.OUTPUT,
    name: '数据输出',
  },
]

// 不同节点类型的icon
export const NODE_TYPE_LOGO: Map<NodeType, string> = new Map<NodeType, string>([
  [NodeType.INPUT,
    'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*RXnuTpQ22xkAAAAAAAAAAAAADtOHAQ/original'], // 数据输入
  [NodeType.FILTER,
    'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*ZJ6qToit8P4AAAAAAAAAAAAADtOHAQ/original'], // 数据筛选
  [NodeType.JOIN,
    'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*EHqyQoDeBvIAAAAAAAAAAAAADtOHAQ/original'], // 数据连接
  [NodeType.UNION,
    'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*k4eyRaXv8gsAAAAAAAAAAAAADtOHAQ/original'], // 数据合并
  [NodeType.AGG,
    'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*TKG8R6nfYiAAAAAAAAAAAAAADtOHAQ/original'], // 数据聚合
  [NodeType.OUTPUT,
    'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*zUgORbGg1HIAAAAAAAAAAAAADtOHAQ/original'], // 数据输出
]);

/**
 * 根据起点初始下游节点的位置信息
 * @param node 起始节点
 * @param graph
 * @param dx
 * @param dy
 * @returns
 */
export const getDownstreamNodePosition = (
  node: Node,
  graph: Graph,
  dx = 250,
  dy = 100,
) => {
  // 找出画布中以该起始节点为起点的相关边的终点id集合
  const downstreamNodeIdList: string[] = []
  graph.getEdges().forEach((edge) => {
    const originEdge = edge.toJSON()?.data
    if (originEdge.source === node.id) {
      downstreamNodeIdList.push(originEdge.target)
    }
  })
  // 获取起点的位置信息
  const position = node.getPosition()
  let minX = Infinity
  let maxY = -Infinity
  graph.getNodes().forEach((graphNode) => {
    if (downstreamNodeIdList.indexOf(graphNode.id) > -1) {
      const nodePosition = graphNode.getPosition()
      // 找到所有节点中最左侧的节点的x坐标
      if (nodePosition.x < minX) {
        minX = nodePosition.x
      }
      // 找到所有节点中最x下方的节点的y坐标
      if (nodePosition.y > maxY) {
        maxY = nodePosition.y
      }
    }
  })

  return {
    x: minX !== Infinity ? minX : position.x + dx,
    y: maxY !== -Infinity ? maxY + dy : position.y,
  }
}

// 根据节点的类型获取ports
export const getPortsByType = (type: NodeType, nodeId: string) => {
  let ports = []
  switch (type) {
    case NodeType.INPUT:
      ports = [
        {
          id: `${nodeId}-out`,
          group: 'out',
        },
      ]
      break
    case NodeType.OUTPUT:
      ports = [
        {
          id: `${nodeId}-in`,
          group: 'in',
        },
      ]
      break
    default:
      ports = [
        {
          id: `${nodeId}-in`,
          group: 'in',
        },
        {
          id: `${nodeId}-out`,
          group: 'out',
        },
      ]
      break
  }
  return ports
}

/**
 * 创建节点并添加到画布
 * @param type 节点类型
 * @param graph
 * @param position 节点位置
 * @returns
 */
export const createNode = (
  type: NodeType,
  graph: Graph,
  position?: Position,
): Node => {
  if (!graph) {
    return {} as Node
  }
  const sameTypeNodes = graph
    .getNodes()
    .filter((item) => item.getData()?.type === type)
  const typeName = PROCESSING_TYPE_LIST?.find(
    (item) => item.type === type,
  )?.name
  const id = StringExt.uuid()
  const node = {
    id,
    shape: 'data-processing-dag-node',
    x: position?.x,
    y: position?.y,
    ports: getPortsByType(type, id),
    data: {
      name: `${typeName}_${sameTypeNodes.length + 1}`,
      type,
    },
  }
  return graph.addNode(node) as Node
}

/**
 * 创建边并添加到画布
 * @param source
 * @param target
 * @param graph
 */
export const createEdge = (source: string, target: string, graph: Graph) => {
  const edge = {
    id: StringExt.uuid(),
    shape: 'data-processing-curve',
    source: {
      cell: source,
      port: `${source}-out`,
    },
    target: {
      cell: target,
      port: `${target}-in`,
    },
    zIndex: -1,
    data: {
      source,
      target,
    },
  }
  if (graph) {
    graph.addEdge(edge)
  }
}

export const registerShapeType = () => {
  register({
    shape: "data-processing-dag-node",
    width: 212,
    height: 48,
    component: DeploymentDagNode,
    // port默认不可见
    ports: {
      groups: {
        in: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: 'transparent',
              strokeWidth: 1,
              fill: 'transparent',
            },
          },
        },

        out: {
          position: {
            name: 'right',
            args: {
              dx: -32,
            },
          },

          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: 'transparent',
              strokeWidth: 1,
              fill: 'transparent',
            },
          },
        },
      },
    },
  })

  // 注册连线
  Graph.registerConnector(
    'curveConnector',
    (sourcePoint, targetPoint) => {
      const hgap = Math.abs(targetPoint.x - sourcePoint.x)
      const path = new Path()
      path.appendSegment(
        Path.createSegment('M', sourcePoint.x - 4, sourcePoint.y),
      )
      path.appendSegment(
        Path.createSegment('L', sourcePoint.x + 12, sourcePoint.y),
      )
      // 水平三阶贝塞尔曲线
      path.appendSegment(
        Path.createSegment(
          'C',
          sourcePoint.x < targetPoint.x
            ? sourcePoint.x + hgap / 2
            : sourcePoint.x - hgap / 2,
          sourcePoint.y,
          sourcePoint.x < targetPoint.x
            ? targetPoint.x - hgap / 2
            : targetPoint.x + hgap / 2,
          targetPoint.y,
          targetPoint.x - 6,
          targetPoint.y,
        ),
      )
      path.appendSegment(
        Path.createSegment('L', targetPoint.x + 2, targetPoint.y),
      )

      return path.serialize()
    },
    true,
  )

  Edge.config({
    markup: [
      {
        tagName: 'path',
        selector: 'wrap',
        attrs: {
          fill: 'none',
          cursor: 'pointer',
          stroke: 'transparent',
          strokeLinecap: 'round',
        },
      },
      {
        tagName: 'path',
        selector: 'line',
        attrs: {
          fill: 'none',
          pointerEvents: 'none',
        },
      },
    ],
    connector: {name: 'curveConnector'},
    attrs: {
      wrap: {
        connection: true,
        strokeWidth: 10,
        strokeLinejoin: 'round',
      },
      line: {
        connection: true,
        stroke: '#A2B1C3',
        strokeWidth: 1,
        targetMarker: {
          name: 'classic',
          size: 6,
        },
      },
    },
  })

  Graph.registerEdge('data-processing-curve', Edge, true)
}
import {Edge, Graph, Node, Platform, StringExt} from "@antv/x6";
import {Selection} from "@antv/x6-plugin-selection";
import {History} from "@antv/x6-plugin-history";
import {Keyboard} from "@antv/x6-plugin-keyboard";
import {Export} from "@antv/x6-plugin-export";
import {Clipboard} from "@antv/x6-plugin-clipboard";
import {globalVar} from "@/store";
import {CellStatus, NodeData, NodeProp, NodeType, Position} from "@/node";
import {eventBus, EventEnum} from "@/utils/event-bus";

/**
 * 创建节点并添加到画布
 * @param prop 节点类型对应的属性值
 * @param graph
 * @param position 节点位置
 * @returns
 */
export const createNode = (
  prop: NodeProp,
  graph: Graph,
  position?: Position
): Node => {
  const node = GraphUtil.createTmpNode(prop, graph, position);
  return graph.addNode(node) as Node;
};

/**
 * 创建边并添加到画布
 * @param source
 * @param target
 * @param graph
 */
export const createEdge = (source: string, target: string, graph: Graph) => {
  const edge = {
    id: StringExt.uuid(),
    shape: "deployment-curve",
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
  };
  if (graph) {
    graph.addEdge(edge);
  }
};

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
  dy = 100
) => {
  // 找出画布中以该起始节点为起点的相关边的终点id集合
  const downstreamNodeIdList: string[] = [];
  graph.getEdges().forEach((edge) => {
    const originEdge = edge.toJSON()?.data;
    if (originEdge.source === node.id) {
      downstreamNodeIdList.push(originEdge.target);
    }
  });
  // 获取起点的位置信息
  const position = node.getPosition();
  let minX = Infinity;
  let maxY = -Infinity;
  graph.getNodes().forEach((graphNode) => {
    if (downstreamNodeIdList.indexOf(graphNode.id) > -1) {
      const nodePosition = graphNode.getPosition();
      // 找到所有节点中最左侧的节点的x坐标
      if (nodePosition.x < minX) {
        minX = nodePosition.x;
      }
      // 找到所有节点中最x下方的节点的y坐标
      if (nodePosition.y > maxY) {
        maxY = nodePosition.y;
      }
    }
  });

  return {
    x: minX !== Infinity ? minX : position.x + dx,
    y: maxY !== -Infinity ? maxY + dy : position.y,
  };
};

export const refreshNodeStatus = () => {
  const graph = globalVar.graph;
  graph.getNodes().forEach((node) => {
    const nodeData = node.getData<NodeData>();
    nodeData.status = CellStatus.DEFAULT;
  });
  graph.getEdges().forEach((edge) => {
    edge.attr({
      line: {
        stroke: "#A2B1C3",
        strokeWidth: 1,
      },
    });
    edge.attr("line/strokeDasharray", 5);
  });
};

// 关闭边运行的动画
export const stopAnimate = (edge: Edge, sourceNode?: Node) => {
  edge.attr("line/strokeDasharray", 0);
  edge.attr("line/style/animation", "");
  if (!sourceNode) {
    sourceNode = edge.getSourceNode() as Node;
  }
  const status = sourceNode?.getData<NodeData>().status;
  if (status === CellStatus.SUCCESS) {
    edge.attr("line/stroke", "#52c41a");
  } else if (status === CellStatus.ERROR) {
    edge.attr("line/stroke", "#ff4d4f");
  }
};

// 开启边的运行动画
export const executeAnimate = (edge: Edge) => {
  edge.attr({
    line: {
      stroke: "#3471F9",
    },
  });
  edge.attr("line/strokeDasharray", 5);
  edge.attr("line/style/animation", "running-line 30s infinite linear reverse");
};

// TODO: 以下方法继承自先有的另一个项目，后续将进一步整理修改，并计划移除命名空间
export namespace GraphUtil {
  // 根据节点的类型获取ports
  export const getPortsByType = (type: NodeType, nodeId: string) => {
    let ports: any[];
    switch (type) {
      default:
        ports = [
          {
            id: `${nodeId}-in`,
            group: "in",
          },
          {
            id: `${nodeId}-out`,
            group: "out",
          },
        ];
        break;
    }
    return ports;
  };

  export const createTmpNode = (
    prop: NodeProp,
    graph: Graph,
    position?: Position
  ): Node => {
    if (!graph) {
      return {} as Node;
    }
    const type = prop.type;
    const nodeData = prop.data();
    const sameTypeNodes = graph
      .getNodes()
      .filter((item) => item.getData()?.type === type);
    if (sameTypeNodes.length > 0) {
      nodeData.module.name = `${nodeData.type}_${sameTypeNodes.length}`;
    } else {
      nodeData.module.name = nodeData.type;
    }
    const id = StringExt.uuid();
    const nodeMetadata = {
      id,
      shape: "deployment-dag-node",
      x: position?.x,
      y: position?.y,
      ports: getPortsByType(type, id),
      data: nodeData,
    };
    return graph.createNode(nodeMetadata);
  };

  export function disposeGraph(graph: Graph) {
    graph.dispose();
  }

  export const saveCanvas = async (graph: Graph) => {
    // globalStore.setSaving(true);
    // graph.toPNG(async (dataUri) => {
    //         const base64Index = dataUri.indexOf(',') + 1;
    //         const thumbnailBase64 = dataUri.substring(base64Index);
    //         CanvasStoreApi.saveCanvas(globalStore.getCanvasId(), {
    //             name: globalStore.getCanvasName(),
    //             thumbnail: thumbnailBase64,
    //             tableDetails: globalStore.tableDetails,
    //             graphData: JSON.stringify(graph.toJSON()),
    //         }).then(response => {
    //             if (response.status === 200) {
    //                 globalStore.setLastModifiedTime(response.data.lastModifiedTime);
    //                 ElNotification({
    //                     message: "画布已保存",
    //                     duration: 1500,
    //                 });
    //                 globalStore.setSaving(false);
    //                 globalStore.setModified(false);
    //             } else {
    //                 ElMessage.error("出现错误！");
    //             }
    //         });
    //     },
    //     {
    //         // copyStyles: false, 防止 el-button 样式出现抖动，但疑似会导致自定义样式无法加载。
    //         // issue：https://github.com/antvis/X6/issues/2061
    //         copyStyles: false,
    //         width: 350,
    //         height: 150,
    //         backgroundColor: "#F2F7FA",
    //         padding: 20,
    //         quality: 1,
    //     });
  };

  const selectColumn = (portId: string, node: Node) => {
    // node.setPortProp(portId as string, "attrs/portBody/fill", "#FFE8D5");
    // globalStore.selectedColumns.set(portId, node);
  };

  const deselectColumns = () => {
    // globalStore.selectedColumns.forEach((node, portId) => {
    //     node.setPortProp(portId as string, "attrs/portBody/fill", "#EFF4FF")
    // });
    // globalStore.selectedColumns.clear();
  };

  const deselectColumn = (portId: string) => {
    // globalStore.selectedColumns.get(portId)?.setPortProp(portId as string, "attrs/portBody/fill", "#EFF4FF");
    // globalStore.selectedColumns.delete(portId);
  };

  const plugins = () => {
    return [
      // 选择插件
      new Selection({
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        rubberEdge: true,
        rubberNode: true,
        modifiers: "shift",
      }),
      // 撤销、重做
      new History({
        enabled: true,
      }),
      // 键盘事件插件
      new Keyboard({
        enabled: true,
        global: true,
      }),
      // 缩略图导出插件
      new Export(),
      // 复制粘贴
      new Clipboard({
        enabled: true,
      }),
    ];
  };

  const createGraph = (container: HTMLElement): Graph => {
    const graph = new Graph({
      container: container,
      autoResize: true,
      mousewheel: {
        // 画布缩放
        enabled: true,
        modifiers: ["ctrl"],
        factor: 1.1,
        maxScale: 1.5,
        minScale: 0.5,
      },
      panning: {
        // 画布平移
        enabled: true,
      },
      highlighting: {
        magnetAdsorbed: {
          name: "stroke",
          args: {
            attrs: {
              fill: "#fff",
              stroke: "#31d0c6",
              strokeWidth: 4,
            },
          },
        },
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        sourceAnchor: {
          name: "right", // 曲线方向翻转
          args: {
            dx: Platform.IS_SAFARI ? 4 : -8,
          },
        },
        targetAnchor: {
          name: "left",
          args: {
            dx: Platform.IS_SAFARI ? 4 : 8,
          },
        },
        createEdge() {
          return this.createEdge({
            shape: "deployment-curve",
            attrs: {
              line: {
                strokeDasharray: "5 5",
              },
            },
            zIndex: -1,
          });
        },
        // 连接桩校验
        validateConnection({ sourceMagnet, targetMagnet }) {
          // 只能从输出链接桩创建连接
          if (
            !sourceMagnet ||
            sourceMagnet.getAttribute("port-group") === "in"
          ) {
            return false;
          }
          // 只能连接到输入链接桩
          return !(
            !targetMagnet || targetMagnet.getAttribute("port-group") !== "in"
          );
        },
      },
      background: {
        color: "#F2F7FA",
      },
      grid: {
        visible: true,
        type: "doubleMesh",
        args: [
          {
            color: "#eee", // 主网格线颜色
            thickness: 1, // 主网格线宽度
          },
          {
            color: "#ddd", // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4, // 主次网格线间隔
          },
        ],
      },
    });
    // const minimapContainer = document.createElement('div');
    // // 引入小地图插件
    // graph.use(new MiniMap({
    //   container: minimapContainer, // 动态创建容器
    //   width: 240,  // 小地图宽度
    //   height: 135, // 小地图高度
    //   padding: 10, // 内边距
    //   scalable: false, // 禁用缩放（可选）
    // }));
    // // 将 Minimap 的 DOM 元素覆盖到画布左下角
    // minimapContainer.style.position = 'absolute';
    // minimapContainer.style.left = '0';    // 左下角水平偏移
    // minimapContainer.style.bottom = '0'; // 左下角垂直偏移
    // minimapContainer.style.border = '1px solid #d9d9d9';
    // minimapContainer.style.background = '#fff';
    //
    // // 将 Minimap 添加到画布容器中
    // container.appendChild(minimapContainer);
    return graph;
  };

  const initPlugins = (graph: Graph) => {
    plugins().forEach((plugin) => {
      graph.use(plugin);
    });
  };

  const initKeyHandlers = (graph: Graph) => {
    // 绑定删除元素操作
    graph.bindKey(["backspace", "delete"], () => {
      const cells = graph.getSelectedCells();
      cells.forEach((cell) => {
        cell.remove();
      });
    });
    // 绑定撤销操作
    graph.bindKey(["ctrl+z"], () => {
      graph.undo();
      // TODO: 同步刷新详情菜单
    });
    // 绑定重做操作
    graph.bindKey(["ctrl+shift+z"], () => {
      graph.redo();
    });
    // 绑定保存操作
    graph.bindKey(["ctrl+s"], (e) => {
      e.preventDefault();
      saveCanvas(graph).then();
    });
    graph.bindKey(["ctrl+c"], () => {
      graph.copy(graph.getSelectedCells());
    });
    graph.bindKey(["ctrl+v"], () => {
      const cells = graph.paste({
        offset: 50,
        useLocalStorage: false,
      });
      graph.cleanSelection();
      graph.select(cells);
    });
  };

  const initEventHandlers = (graph: Graph) => {
    // // 监听节点选中事件
    // graph.on('node:selected', ({node}) => {
    //   eventBus.emit(EVENT_NODE_SELECTED, node); // 通过事件总线向其他组件传递事件
    // });
    // 监听节点选中事件，处理框选
    graph.on("selection:changed", ({ selected }) => {
      let nodeCount = 0;
      let selectedNode: Node = null as any;
      selected.forEach((cell) => {
        if (cell.isNode()) {
          nodeCount++;
          selectedNode = cell as Node;
        }
      });
      if (nodeCount === 1) {
        // 只选中了单个结点
        eventBus.emit(EventEnum.NODE_SELECTED, selectedNode); // 通过事件总线向其他组件传递事件
      } else {
        // 处理框选的情况
        eventBus.emit(EventEnum.NODE_UNSELECTED); // 隐藏详情栏
      }
    });
    // // 监听节点取消选中事件，清除右边栏信息
    // graph.on('node:unselected', () => {
    //   eventBus.emit(EVENT_NODE_UNSELECTED);
    // });
    graph.on("edge:click", ({ edge }) => {
      deselectColumns();
      // 可以在这里执行选中边后的操作
      // 例如：获取边的属性、展示边的信息等
      // eventBus.emit(EVENT_EDGE_CLICK, edge);
    });
    // // 监听空白区域点击事件，隐藏详细信息
    graph.on("blank:click", () => {
      deselectColumns();
    });
    // graph.on('node:click', () => {
    //   deselectColumns();
    // });
    // 监听 port 点击事件
    graph.on("node:port:click", ({ node, port }) => {
      // if (globalStore.selectedColumns.has(port as string)) {
      //     deselectColumn(port as string);
      // } else {
      //     selectColumn(port as string, node);
      // }
    });
    graph.on("node:port:contextmenu", ({ node, port, e }) => {
      e.preventDefault(); // 阻止默认右键行为
      // if (!globalStore.selectedColumns.has(port as string)) {     // 选中当前右键的列
      //     selectColumn(port as string, node);
      // }
      // ContextMenu.showContextMenu({        // 显示菜单
      //     theme: 'flat',
      //     // customClass: 'my-menu', // TODO: 自定义菜单样式
      //     x: e.clientX,
      //     y: e.clientY,
      //     items: [
      //         {
      //             label: "映射",
      //             onClick: () => {
      //
      //                 const newNode = graph.addNode({
      //                     shape: 'map-hub-node',
      //                     x: e.clientX + 30,
      //                     y: e.clientY - LINE_HEIGHT,
      //                     // attrs: {
      //                     //   operatorLabel: {
      //                     //     text: operator
      //                     //   },
      //                     //   conditionLabel: {
      //                     //     text: condition
      //                 });
      //
      //                 globalStore.selectedColumns.forEach((node, portId) => {
      //                     graph.addEdge({
      //                         source: {
      //                             cell: node.id,
      //                             port: portId,
      //                         },
      //                         target: newNode,
      //                         attrs: {
      //                             line: {
      //                                 stroke: "#A2B1C3",
      //                                 strokeWidth: 2,
      //                                 strokeDasharray: '5,5'
      //                             }
      //                         },
      //                         zIndex: 0,
      //                     });
      //                 });
      //
      //                 deselectColumns();
      //             }
      //         },
      //         {
      //             label: "默认值",
      //             onClick: () => {
      //                 const newNode = graph.addNode({
      //                     shape: 'map-hub-node',
      //                     x: e.clientX - 30,
      //                     y: e.clientY - LINE_HEIGHT,
      //                     attrs: {
      //                         operatorLabel: {
      //                             text: "默认值"
      //                         }
      //                     }
      //                 });
      //                 let nodeId = "";
      //                 let portId = "";
      //                 for (const entry of globalStore.selectedColumns.entries()) {
      //                     portId = entry[0];
      //                     nodeId = entry[1].id;
      //                 }
      //                 graph.addEdge({
      //                     source: newNode,
      //                     target: {
      //                         cell: nodeId,
      //                         port: portId,
      //                     },
      //                     attrs: {
      //                         line: {
      //                             stroke: "#A2B1C3",
      //                             strokeWidth: 2,
      //                             strokeDasharray: '5,5'
      //                         }
      //                     },
      //                     zIndex: 0,
      //                 })
      //             }
      //         }
      //     ]
      // });
    });
    // 监听节点右键事件，定义右键菜单及其功能
    graph.on("node:contextmenu", ({ node, e }) => {
      // 检查是否是 port 被点击
      if (e.target.closest(".x6-port")) {
        return; // 阻止 node 的右键菜单显示
      }
      e.preventDefault(); // 阻止默认右键行为
      // globalStore.setSelectedNode(node);   // 设置当前节点
      // 创建右键菜单
      // TableNodeContextMenu.show(e.clientX, e.clientY);
    });
    /* ------ 监听画布修改事件 ------ */
    graph.on("cell:change:*", () => {
      // globalStore.setModified(true);
    });

    graph.on("cell:added", () => {
      // globalStore.setModified(true);
    });

    graph.on("cell:removed", () => {
      // globalStore.setModified(true);
    });
    /* --------------------------- */
  };

  const initStore = (graph: Graph) => {
    globalVar.graph = graph;
    // globalStore.clearSelectedNode();
    // globalStore.selectedColumns = new Map<string, Node>();
    // globalStore.count = 0;
    // globalStore.namespace = new Set<string>();
    // globalStore.setModified(false);
    // globalStore.setSaving(false);
  };

  export function initGraph(container: HTMLElement): Graph {
    const graph = createGraph(container);
    initPlugins(graph);
    initKeyHandlers(graph);
    initEventHandlers(graph);
    initStore(graph);
    return graph;
  }
}

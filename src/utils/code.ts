import { globalVar } from "@/store";
import { Node } from "@antv/x6";
import { LinkedListQueue, Queue } from "@/utils/queue";
import { message } from "ant-design-vue";
import { executeAnimate, stopAnimate } from "@/utils/graph-util";
import { CellStatus, NodeData, Variable } from "@/node";

export const generate = async () => {
  const graph = globalVar.graph;
  // 1. 获取图中的节点以及其入度
  const nodes = graph.getNodes();
  if (nodes.length === 0) {
    message.info("图为空");
    return;
  }
  const nodesWithOutDegree = new Map<string, number>();
  const queue: Queue<Node> = new LinkedListQueue<Node>();
  nodes.forEach((node) => {
    const outDegree = graph.getOutgoingEdges(node)?.length || 0;
    if (outDegree === 0) {
      queue.push(node);
    }
    nodesWithOutDegree.set(node.id, outDegree);
  });
  // 2. 以逆拓扑顺序生成代码以实现动画效果
  if (queue.empty()) {
    message.error("图中存在环");
    return;
  }
  let num = 0;
  const builder = new CodeBuilder();
  while (!queue.empty()) {
    num++;
    const node = queue.pop() as Node;
    const nodeData = node.getData<NodeData>();
    // 2.1 获取 module 依赖
    const outgoingEdges = graph.getOutgoingEdges(node);
    const dependency: string[] = [];
    outgoingEdges?.forEach((edge) => {
      dependency.push(
        "module." + edge.getTargetNode()?.getData<NodeData>().module.name
      );
    });
    // 2.2 生成当前结点对应的 terraform 代码
    const success = generateModuleCode(nodeData.module, builder, dependency);
    // 2.3 延时关闭边动画并设置结点状态
    setTimeout(() => {
      nodeData.status = success? CellStatus.SUCCESS : CellStatus.ERROR;
      outgoingEdges?.forEach((edge) => {
        stopAnimate(edge, node);
      });
    }, 600);
    if (!success) continue;
    // 2.4 遍历子结点
    graph.getIncomingEdges(node)?.forEach((edge) => {
      // 2.4.1 开启边动画
      executeAnimate(edge);
      // 2.4.2 选中出度为 0 的结点加入队列
      const sourceNode = edge.getSourceNode() as Node;
      const inDegree =
        (nodesWithOutDegree.get(sourceNode?.id as string) as number) - 1;
      nodesWithOutDegree.set(sourceNode.id, inDegree);
      if (inDegree === 0) {
        queue.push(sourceNode);
      }
    });
  }
  if (num !== nodes.length) {
    message.error("图中存在环");
    // 设置环中结点状态
    nodesWithOutDegree.forEach((value, key) => {
      if (value !== 0) {
        const node = graph.getCellById(key) as Node;
        const nodeData = node.getData<NodeData>();
        nodeData.status = CellStatus.ERROR;
        // 关闭边的动画
        graph.getOutgoingEdges(node)?.forEach((edge) => {
          stopAnimate(edge, node);
        });
      }
    });
    return;
  }
  const filename = "main.tf";
  const file = new File([builder.build()], filename, { type: "text/plain" });
  const url = URL.createObjectURL(file);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 100);
  return;
};

const generateHelper = (module: any, builder: CodeBuilder, level: number): boolean => {
  Object.keys(module).forEach((key) => {
    if (key !== "name") {
      builder.indent(level);
      if (typeof module[key] === "string") {
        builder.append(key).append(' = "').append(module[key]).append('"');
      } else if (typeof module[key] === "number") {
        builder
          .append(key)
          .append(" = ")
          .append((module[key] as number).toString());
      } else if (Array.isArray(module[key])) {
        builder
          .append(key)
          .append(" = ")
          .append(JSON.stringify(module[key] as any[]));
      } else if (module[key] instanceof Variable) {
        builder.append(key).append(" = ").append(module[key].value);
      } else if (typeof module[key] === "object") {
        builder.append(key).append(" = {").newLine();
        const success = generateHelper(module[key], builder, level + 1);
        if (!success) return false;
        builder.indent(level).append("}");
      } else {
        message.error(
          "不支持的类型 " + key + ": " + JSON.stringify(module[key])
        );
        return false;
      }
      builder.newLine();
    }
  });
  return true;
};

const generateModuleCode = (
  module: any,
  builder: CodeBuilder,
  dependency: string[]
): boolean => {
  builder.append('module "').append(module.name).append('" {').newLine();
  const success = generateHelper(module, builder, 1);
  if (!success) return false;
  if (dependency.length > 0) {
    builder.indent(1).append("depends_on = [");
    let sep = "";
    dependency.forEach((item) => {
      builder.append(sep).append(item);
      sep = ", ";
    });
    builder.append("]").newLine();
  }
  builder.append("}").newLine().newLine();
  return true;
};

class CodeBuilder {
  private content: string[] = [];

  append(code: string): CodeBuilder {
    this.content.push(code);
    return this;
  }

  indent(level: number): CodeBuilder {
    this.append("  ".repeat(level));
    return this;
  }

  newLine(): CodeBuilder {
    this.content.push("\n");
    return this;
  }

  build(): string {
    return this.content.join("");
  }
}

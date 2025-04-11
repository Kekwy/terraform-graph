import {Node} from "@antv/x6";

export class NodeType {
  name: string;
  conf: Node.Config;

  constructor(name: string, conf: Node.Config) {
    this.name = name;
    this.conf = conf;
  }
}
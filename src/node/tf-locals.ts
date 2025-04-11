import {NodeType} from "@/node/node-type";

export class TfLocals extends NodeType {
  static readonly TYPE: NodeType = {
    name: 'tf-locals',
    conf: {
      inherit: 'ellipse',
      width: 120,
      height: 60,
      attrs: {
        body: {
          fill: '#2A9D8F', // 青绿色
          stroke: '#333',
        },
        label: {
          text: 'locals',
          fill: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
    }
  };
}
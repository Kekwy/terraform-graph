import {NodeType} from "@/node/node-type";

export class TfResource extends NodeType {
  static readonly TYPE: NodeType = {
    name: "tf-resource",
    conf: {
      inherit: 'rect',
      width: 120,
      height: 60,
      attrs: {
        body: {
          fill: '#6A994E', // 绿色
          stroke: '#333',
          rx: 10,
          ry: 10,
        },
        label: {
          text: 'resource',
          fill: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
    }
  };
}
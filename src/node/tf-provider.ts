import {NodeType} from "@/node/node-type";

export class TfProvider extends NodeType {
  static readonly TYPE: NodeType = {
    name: "tf-provider",
    conf: {
      inherit: 'rect',
      width: 120,
      height: 60,
      attrs: {
        body: {
          fill: '#4B8BBE', // 蓝色
          stroke: '#333',
          rx: 10,
          ry: 10,
        },
        label: {
          text: 'provider',
          fill: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
    }
  };
}
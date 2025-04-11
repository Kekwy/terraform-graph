import {NodeType} from "@/node/node-type";

export class TfCore {
  static readonly TYPE: NodeType = {
    name: 'tf-core',
    conf: {
      inherit: 'rect',
      width: 120,
      height: 60,
      attrs: {
        body: {
          fill: '#264653', // 深灰蓝色
          stroke: '#333',
          rx: 4,
          ry: 4,
        },
        label: {
          text: 'terraform',
          fill: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
    }
  }
}
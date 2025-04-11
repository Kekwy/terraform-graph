import {NodeType} from "@/node/node-type";

export class TfOutput extends NodeType {
  static readonly TYPE: NodeType = {
    name: 'tf-output',
    conf: {
      inherit: 'polygon',
      width: 120,
      height: 60,
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20',
          fill: '#E76F51', // 红橙色
          stroke: '#333',
        },
        label: {
          text: 'output',
          fill: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
    }
  };
}
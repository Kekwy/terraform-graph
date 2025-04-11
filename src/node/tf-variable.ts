import {NodeType} from "@/node/node-type";

export class TfVariable extends NodeType {
  static readonly TYPE: NodeType = {
    name: 'tf-variable',
    conf: {
      inherit: 'polygon',
      width: 120,
      height: 60,
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20',
          fill: '#F4A261', // 橙色
          stroke: '#333',
        },
        label: {
          text: 'variable',
          fill: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
    }
  };
}
import {NodeType} from "@/node/node-type";

export class TfData extends NodeType {
  static readonly TYPE: NodeType = {
    name: 'tf-data',
    conf: {
      inherit: 'polygon',
      width: 120,
      height: 60,
      attrs: {
        body: {
          refPoints: '10,0 20,0 10,20 0,20',
          fill: '#5C6BC0', // 蓝紫色
          stroke: '#333',
        },
        label: {
          text: 'data source',
          fill: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
    }
  }
}
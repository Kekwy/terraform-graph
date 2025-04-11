import {NodeType} from "@/node/node-type";

export class TfModule extends NodeType {



  static readonly TYPE: NodeType = {
    name: 'tf-module',
    conf: {
      inherit: 'polygon',
      width: 120,
      height: 60,
      attrs: {
        body: {
          refPoints: '10,0 20,10 10,20 0,10',
          fill: '#9D4EDD', // 紫色
          stroke: '#333',
        },
        label: {
          text: 'module',
          fill: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
    }
  }
}
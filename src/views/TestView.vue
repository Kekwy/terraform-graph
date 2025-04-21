<script lang="ts">

import {defineComponent, nextTick} from "vue";
import {GraphUtil} from "@/utils/graph-util";
import {Graph} from "@antv/x6";
import {CellStatus} from "@/node";

export default defineComponent({
  name: 'TestView',
  mounted() {
    nextTick(() => {
      // 创建画布
      this.graph = GraphUtil.initGraph(this.$refs.container as HTMLElement);
      // 生成节点
      fetch('/data/data-processing-dag.json')
          .then((response) => response.json())
          .then((data) => {
            this.graph.fromJSON(data)
            const zoomOptions = {
              padding: {
                left: 10,
                right: 10,
              },
            }
            this.graph.zoomToFit(zoomOptions)
            setTimeout(() => {
              this.excuteAnimate()
            }, 2000)
            setTimeout(() => {
              this.showNodeStatus()
              this.stopAnimate()
            }, 3000)
          })
    })
  },
  data(): {
    graph: Graph,
    nodeStatusList: {
      id: string,
      status: CellStatus,
      statusMsg?: string,
    }[],
    edgeStatusList: {
      id: string,
      status: CellStatus,
      statusMsg?: string,
    }[],
  } {
    return {
      graph: null as any,
      nodeStatusList: [
        {
          id: 'node-0',
          status: CellStatus.SUCCESS,
        },
        {
          id: 'node-1',
          status: CellStatus.SUCCESS,
        },
        {
          id: 'node-2',
          status: CellStatus.SUCCESS,
        },
        {
          id: 'node-3',
          status: CellStatus.SUCCESS,
        },
        {
          id: 'node-4',
          status: CellStatus.ERROR,
          statusMsg: '错误信息示例',
        },
      ],
      // 边状态列表
      edgeStatusList: [
        {
          id: 'edge-0',
          status: CellStatus.SUCCESS,
        },
        {
          id: 'edge-1',
          status: CellStatus.SUCCESS,
        },
        {
          id: 'edge-2',
          status: CellStatus.SUCCESS,
        },
        {
          id: 'edge-3',
          status: CellStatus.SUCCESS,
        },
      ]
    }
  },
  methods: {

    // 显示节点状态
    showNodeStatus() {
      this.nodeStatusList.forEach((item) => {
        const {id, status, statusMsg} = item
        const node = this.graph.getCellById(id)
        const data = node.getData()
        console.log(status)
        node.setData({
          ...data,
          status,
          statusMsg,
        })
      })
    },

    // 开启边的运行动画
    excuteAnimate() {
      this.graph.getEdges().forEach((edge) => {
        edge.attr({
          line: {
            stroke: '#3471F9',
          },
        })
        edge.attr('line/strokeDasharray', 5)
        edge.attr('line/style/animation', 'running-line 30s infinite linear')
      })
    },

    // 关闭边的动画
    stopAnimate() {
      this.graph.getEdges().forEach((edge) => {
        edge.attr('line/strokeDasharray', 0)
        edge.attr('line/style/animation', '')
      })
      this.edgeStatusList.forEach((item) => {
        const {id, status} = item
        const edge = this.graph.getCellById(id)
        if (status === CellStatus.SUCCESS) {
          edge.attr('line/stroke', '#52c41a')
        }
        if (status === CellStatus.ERROR) {
          edge.attr('line/stroke', '#ff4d4f')
        }
      })
      // 默认选中一个节点
      this.graph.select('node-2')
    }
  }
})

</script>

<template>
  <div ref="container" style="width: 100vw; height: 100vh; overflow: hidden"/>
</template>

<style scoped>

</style>
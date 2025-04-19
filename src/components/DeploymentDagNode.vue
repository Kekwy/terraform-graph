<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { Node } from '@antv/x6'
import { PROCESSING_TYPE_LIST, NODE_TYPE_LOGO, NodeType, CellStatus, createNode, createEdge, getDownstreamNodePosition } from '@/node'

const props = defineProps<{ node: Node }>()

const plusActionSelected = ref(false)

const onPlusDropdownOpenChange = (val: boolean) => {
  plusActionSelected.value = val
}

const clickPlusDragMenu = (type: NodeType) => {
  const node = props.node
  const graph = node.model?.graph
  if (graph) {
    const pos = getDownstreamNodePosition(node, graph)
    const newNode = createNode(type, graph, pos)
    createEdge(node.id, newNode.id, graph)
  }
  plusActionSelected.value = false
}

const onMainMouseEnter = () => {
  props.node.getPorts().forEach((port) => {
    props.node.setPortProp(port.id as string, 'attrs/circle', {
      fill: '#fff',
      stroke: '#85A5FF',
    })
  })
}

const onMainMouseLeave = () => {
  props.node.getPorts().forEach((port) => {
    props.node.setPortProp(port.id as string, 'attrs/circle', {
      fill: 'transparent',
      stroke: 'transparent',
    })
  })
}

const { name, type, status, statusMsg } = props.node.getData()
</script>

<template>
  <div class="data-processing-dag-node">
    <div class="main-area" @mouseenter="onMainMouseEnter" @mouseleave="onMainMouseLeave">
      <div class="main-info">
        <i class="node-logo" :style="{ backgroundImage: `url(${NODE_TYPE_LOGO[type]})` }" />
        <a-tooltip :title="name" :mouseEnterDelay="0.8">
          <div class="ellipsis-row node-name">{{ name }}</div>
        </a-tooltip>
      </div>
      <div class="status-action">
        <a-tooltip v-if="status === CellStatus.ERROR" :title="statusMsg">
          <i class="status-icon status-icon-error" />
        </a-tooltip>
        <i v-if="status === CellStatus.SUCCESS" class="status-icon status-icon-success" />
        <div class="more-action-container">
          <i class="more-action" />
        </div>
      </div>
    </div>

    <div class="plus-dag" v-if="type !== NodeType.OUTPUT">
      <a-dropdown
          placement="bottom"
          :open="plusActionSelected"
          @openChange="onPlusDropdownOpenChange"
          trigger="click"
          overlayClassName="processing-node-menu"
      >
        <template #overlay>
          <ul>
            <li
                class="each-sub-menu"
                v-for="item in PROCESSING_TYPE_LIST"
                :key="item.type"
                @click="clickPlusDragMenu(item.type)"
            >
              <i class="node-mini-logo" :style="{ backgroundImage: `url(${NODE_TYPE_LOGO[item.type]})` }" />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </template>
        <i :class="['plus-action', { 'plus-action-selected': plusActionSelected }]" />
      </a-dropdown>
    </div>
  </div>
</template>



<style scoped>
/* 样式保持一致，可按 React 版本拷贝改写 */
</style>
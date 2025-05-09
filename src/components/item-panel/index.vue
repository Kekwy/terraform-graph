<script lang="ts">
import { NodeProp, nodes } from "@/node";
import ItemPanelItem from "@/components/item-panel/item.vue";
import { eventBus, EventEnum } from "@/utils/event-bus";
import { Dnd } from "@antv/x6-plugin-dnd";
import { globalVar } from "@/store";
import Vue from "vue";
import { Graph } from "@antv/x6";
import { GraphUtil } from "@/utils/graph-util";

interface ComponentData {
  dnd: Dnd;
  graph: Graph;
}

export default Vue.extend({
  name: "item-panel",
  components: { ItemPanelItem },
  methods: {
    handleGraphInitiated() {
      this.graph = globalVar.graph;
      this.dnd = new Dnd({
        target: this.graph,
      });
    },
    onMousedown(event: MouseEvent, item: NodeProp) {
      const node = GraphUtil.createTmpNode(item, this.graph);
      this.dnd.start(node, event);
    },
  },
  computed: {
    items() {
      return nodes.values();
    },
    // 需要监听的事件总线的事件及其处理方法
    events(): Map<EventEnum, () => void> {
      return new Map<EventEnum, () => void>([
        [EventEnum.GRAPH_INITIATED, this.handleGraphInitiated],
      ]);
    },
  },
  data(): ComponentData {
    return {
      dnd: null as any,
      graph: null as any,
    };
  },
  beforeMount() {
    // 注册监听事件的处理方法
    this.events.forEach((handler: () => void, event: EventEnum) => {
      eventBus.on(event, handler);
    });
  },
  beforeDestroy() {
    // 移除监听事件的处理方法
    this.events.forEach((handler: () => void, event: EventEnum) => {
      eventBus.off(event, handler);
    });
  },
});
</script>

<template>
  <div class="icon-page">
    <div class="icon-row">
      <div v-for="(item, index) in items" :key="index">
        <div @mousedown="onMousedown($event, item)">
          <item-panel-item :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-page {
  padding: 20px;
  font-family: sans-serif;
}

.icon-row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>

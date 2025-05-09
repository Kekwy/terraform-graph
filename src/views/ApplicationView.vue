<script lang="ts">

import Vue, {nextTick} from "vue";
import {GraphUtil} from "@/utils/graph-util";
import {Graph, Node} from "@antv/x6";
import {eventBus, EventEnum} from "@/utils/event-bus";
import ConfigPanel from "@/components/config-panel/index.vue";
import DesignerToolBar from "@/components/designer-tool-bar/index.vue";

interface ComponentData {
  graph: Graph;
  visible: boolean;
  selectedNode: Node;
}

export default Vue.extend({
  name: "ApplicationView",

  components: {DesignerToolBar, ConfigPanel},

  computed: {
    events(): Map<EventEnum, () => void> {
      return new Map<EventEnum, (...arg: any[]) => void>([
        [EventEnum.NODE_OPEN_CONFIG_PANEL, this.handleNodeDblclick],
        [EventEnum.NODE_UNSELECTED, this.handleNodeUnselected],
      ]);
    },
  },

  beforeMount() {
    this.events.forEach((handler, event) => {
      eventBus.on(event, handler);
    });
  },

  mounted() {
    nextTick(() => {
      // 创建画布
      this.graph = GraphUtil.initGraph(this.$refs.graphContainer as HTMLElement);
      eventBus.emit(EventEnum.GRAPH_INITIATED);
    })
  },

  beforeDestroy() {
    this.events.forEach((handler, event) => {
      eventBus.off(event, handler);
    });
  },

  methods: {
    handleNodeDblclick(selectedNode: Node) {
      this.selectedNode = selectedNode;
      this.showDrawer();
    },
    handleNodeUnselected() {
      this.closeDrawer();
    },
    showDrawer() {
      this.visible = true;
    },
    closeDrawer() {
      this.visible = false;
      this.selectedNode = null as any;
    },
    onClose() {
      this.visible = false;
      this.selectedNode = null as any;
      this.graph.cleanSelection();
    },
  },

  data(): ComponentData {
    return {
      graph: null as any,
      visible: false,
      selectedNode: null as any,
    }
  }
})
</script>

<template>
  <div style="background: none; width: 100%; height: 100%; min-width: 750px; display: flex; flex-direction: column;">
    <designer-tool-bar style="height: 48px;"/>
    <div style="width: 100%; flex: 1;">
      <div ref="graphContainer"/>
    </div>
    <a-drawer
        title="配置面板"
        :width="500"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
    >
      <config-panel :selectedNode="selectedNode"/>
    </a-drawer>
  </div>
</template>

<style scoped>

</style>
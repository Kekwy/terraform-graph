<script lang="ts">

import {mapActions, mapState} from 'vuex'
import Vue, {nextTick} from "vue";
import {GraphUtil} from "@/utils/graph-util";
import GraphToolBar from "@/components/GraphToolBar.vue";

export default Vue.extend({
  name: "ApplicationView",
  components: {GraphToolBar},
  computed: {
    ...mapState(['resources', 'connections', 'selectedNode', 'generatedCode'])
  },
  mounted() {
    nextTick(() => {
      // 创建画布
      GraphUtil.initGraph(this.$refs.graphContainer as HTMLElement);
    })
  },
  methods: {
    ...mapActions(['addResource', 'updateResource', 'connectNodes']),
    onNodeSelected(node: any) {
      // this.selectNode(node)
    }
  }
})
</script>

<template>
  <div style="background: none; width: 100%; height: 100%; min-width: 750px; display: flex; flex-direction: column;">
    <graph-tool-bar style="height: 48px;"/>
    <div style="width: 100%; flex: 1;">
      <div ref="graphContainer"/>
    </div>
  </div>
</template>

<style scoped>

</style>
<script lang="ts">
import {Layout} from 'ant-design-vue';

import {mapState, mapActions} from 'vuex'
import Connection from "@/components/Connection.vue";
import CodePreview from "@/views/CodePreview.vue";
import ResourceNode from "@/components/ResourceNode.vue";

export default {
  components: {
    ResourceNode,
    CodePreview,
    Connection,
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ALayoutSider: Layout.Sider,
  },
  computed: {
    ...mapState(['resources', 'connections', 'selectedNode', 'generatedCode'])
  },
  methods: {
    ...mapActions(['addResource', 'updateResource', 'connectNodes']),
    onNodeSelected(node: any) {
      // this.selectNode(node)
    }
  }
}
</script>

<template>
  <a-layout id="">
    <a-layout-sider width="250">
      <ResourcePalette/>
    </a-layout-sider>
    <a-layout-content>
      <div class="canvas-container" ref="canvas">
        <ResourceNode
            v-for="resource in resources"
            :key="resource.id"
            :resource="resource"
            @selected="onNodeSelected"
        />
        <Connection
            v-for="conn in connections"
            :key="conn.id"
            :connection="conn"
        />
      </div>
    </a-layout-content>
    <a-layout-sider width="350">
      <PropertyPanel v-if="selectedNode" :resource="selectedNode"/>
      <CodePreview :code="generatedCode"/>
    </a-layout-sider>
  </a-layout>
</template>

<style scoped>

</style>
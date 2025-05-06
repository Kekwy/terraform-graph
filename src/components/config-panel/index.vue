<!--suppress SuspiciousTypeOfGuard -->
<script lang="ts">
import Vue, {PropType} from "vue";
import {Node} from "@antv/x6";
import {NodeData} from "@/node/types";

export default Vue.extend({
  name: 'config-panel',
  props: {
    selectedNode: {
      type: Object as PropType<Node>,
      required: true,
    }
  },
  computed: {

  },
  data() {
    return {
      nodeModuleData: null as any,
    }
  },
  beforeMount() {
    this.nodeModuleData = this.selectedNode.getData<NodeData>().module as any;
  },
  watch: {
    selectedNode(newNode: Node) {
      this.nodeModuleData = newNode.getData<NodeData>().module as any;
    }
  },
});
</script>

<template>
  <!-- TODO: 从左到右展开的一个面板 -->
  <a-form layout="vertical">
    <template v-for="(value, key) in nodeModuleData">
      <a-form-item :key="key" :label="selectedNode.getData().text[key]">
        <!-- 字符串 -->
        <a-input v-if="typeof value === 'string'" v-model="nodeModuleData[key]" />

        <!-- 数组 -->
<!--        <a-select-->
<!--            v-else-if="isArray(value)"-->
<!--            v-model="formState[key]"-->
<!--            mode="tags"-->
<!--            style="width: 100%"-->
<!--        />-->

        <!-- 布尔 -->
<!--        <a-switch-->
<!--            v-else-if="isBoolean(value)"-->
<!--            v-model="formState[key]"-->
<!--        />-->

        <!-- 默认 fallback -->
        <span v-else>不支持的类型</span>
      </a-form-item>
    </template>
  </a-form>
</template>

<style scoped>

</style>
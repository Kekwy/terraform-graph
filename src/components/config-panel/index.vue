<!--suppress SuspiciousTypeOfGuard -->
<script lang="ts">
import Vue, { PropType } from "vue";
import { Node } from "@antv/x6";
import { NodeData } from "@/node";
import DynamicFormItem from "@/components/config-panel/dynamic-form-item.vue";

export default Vue.extend({
  name: "config-panel",
  components: { DynamicFormItem },
  props: {
    selectedNode: {
      type: null as unknown as PropType<Node>,
      required: true,
    },
  },
  computed: {},
  methods: {},
  data() {
    return {
      nodeData: null as any,
      emptySet: new Set<string>(),
    };
  },
  beforeMount() {
    if (this.selectedNode !== (null as any)) {
      this.nodeData = this.selectedNode.getData<NodeData>();
    } else {
      this.nodeData = null;
    }
  },
  watch: {
    selectedNode(newNode: Node) {
      if (newNode !== (null as any)) {
        this.nodeData = newNode.getData<NodeData>();
      } else {
        this.nodeData = null as any;
      }
    },
  },
});
</script>

<template>
  <a-form layout="vertical">
    <a-descriptions>
      <a-descriptions-item key="module-name" label="类型">
        {{ nodeData.type }}
      </a-descriptions-item>
    </a-descriptions>
    <dynamic-form-item
      :fixed="nodeData?.fixed_value || emptySet"
      :model-ref="{ value: nodeData?.module || {} }"
      :text="nodeData?.text || {}"
    />
  </a-form>
</template>

<style scoped></style>

<!--suppress SuspiciousTypeOfGuard -->
<script lang="ts">
import Vue, {PropType} from "vue";
import {Node} from "@antv/x6";
import {NodeData} from "@/node/types";
import DynamicFormItem from "@/components/config-panel/dynamic-form-item.vue";

export default Vue.extend({
  name: 'config-panel',
  components: {DynamicFormItem},
  props: {
    selectedNode: {
      type: null as unknown as PropType<Node>,
      required: true,
    }
  },
  computed: {},
  methods: {
    onFormChange() {
      this.selectedNode.setData(this.nodeData);
    }
  },
  data() {
    return {
      nodeData: null as any,
      // 数组表单项相关
      inputVisible: false,
      inputValue: '',
      emptySet: new Set<string>(),
    }
  },
  beforeMount() {
    if (this.selectedNode !== null as any) {
      this.nodeData = this.selectedNode.getData<NodeData>();
    } else {
      this.nodeData = null;
    }
  },
  watch: {
    selectedNode(newNode: Node) {
      if (newNode !== null as any) {
        this.nodeData = newNode.getData<NodeData>();
      } else {
        this.nodeData = null as any;
      }
    }
  },
});
</script>

<template>
  <a-form layout="vertical">
    <dynamic-form-item :fixed="nodeData?.fixed_value || emptySet" :model-ref="{value: nodeData?.module || {}}"
                       :text="nodeData?.text || {}"/>
  </a-form>
</template>

<style scoped>

</style>
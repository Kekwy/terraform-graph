<script lang="ts">
import {defineComponent} from "vue";
import {EVENT_BUS, EVENTS} from "@/utils/event-bus";
import {Graph, Node} from "@antv/x6";
import {Dnd} from "@antv/x6-plugin-dnd";

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Los Angeles battles huge wildfires.',
];

export default defineComponent({
  name: "DesignerSidebar",
  methods: {
    handleGraphInitiated(graph: Graph) {
      // graph.value = graph;
      this.dnd = new Dnd({
        target: graph,
        // dndContainer: itemMenuRef.value
      });
    },
    renderItem(item: any, index: number) {
      return (
          "<a-list-item> {{ item }} </a-list-item>"
      )
    }
  },
  mounted() {
    /* 初始化监听事件 */
    EVENT_BUS.on(EVENTS.GRAPH_INITIATED, (graph) => {
      this.handleGraphInitiated(graph as Graph);
    });
  },
  beforeUnmount() {
    this.events.forEach((event: string) => {
      EVENT_BUS.off(event);
    });
  },
  data() {
    return {
      // TODO: 常量统一定义，减少重复代码
      nodeTypes: [
        {shape: 'tf-provider', label: 'Provider'},
        {shape: 'tf-resource', label: 'Resource'},
        {shape: 'tf-variable', label: 'Variable'},
        {shape: 'tf-output', label: 'Output'},
        {shape: 'tf-module', label: 'Module'},
        {shape: 'tf-data', label: 'Data Source'},
        {shape: 'tf-locals', label: 'Locals'},
        {shape: 'tf-core', label: 'Terraform'},
      ],
      events: [
        EVENTS.GRAPH_INITIATED,
      ],
      dnd: null as any,
      text: data
    }
  },
});
</script>

<template>
  <div>
    <!-- 在当前版本下，antd 对 list 的实现疑似有严重缺陷 -->
    <a-list item-layout="horizontal" bordered style="border: 0">
      <a-list-item v-for="(item, index) in text" :key="index" style="border: 0">
        {{ item }}
      </a-list-item>
    </a-list>
    <a-menu
        mode="inline"
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        :style="{ height: '100%', borderRight: 0, width: '100%' }"
    >
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="user"/>subnav 1</span>
        <div>
          sdfsdfasdfsdf
        </div>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="laptop"/>subnav 2</span>
        <a-menu-item key="5">
          option5
        </a-menu-item>
        <a-menu-item key="6">
          option6
        </a-menu-item>
        <a-menu-item key="7">
          option7
        </a-menu-item>
        <a-menu-item key="8">
          option8
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"><a-icon type="notification"/>subnav 3</span>
        <a-menu-item key="9">
          option9
        </a-menu-item>
        <a-menu-item key="10">
          option10
        </a-menu-item>
        <a-menu-item key="11">
          option11
        </a-menu-item>
        <a-menu-item key="12">
          option12
        </a-menu-item>
      </a-sub-menu>

    </a-menu>
  </div>
</template>

<style scoped>

</style>
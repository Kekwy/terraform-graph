<script lang="ts">
import { defineComponent } from "vue";
import { Node } from "@antv/x6";
import { CellStatus, NodeProp, nodes, NodeType } from "@/node";
import { eventBus, EventEnum } from "@/utils/event-bus";
import {
  createEdge,
  createNode,
  getDownstreamNodePosition,
} from "@/utils/graph-util";

export default defineComponent({
  name: "DeploymentDagNode",

  inject: ["getNode"],

  beforeMount() {
    this.node = (this as any).getNode();
    this.data = this.node.getData();
    this.node.on("change:data", ({ current }) => {
      this.data = current;
    });
  },

  methods: {
    // 发送打开结点配置面板事件
    onDblclick() {
      eventBus.emit(EventEnum.NODE_OPEN_CONFIG_PANEL, this.node);
    },
    // TODO: 为加号按钮添加实际功能
    onPlusDropdownOpenChange(val: boolean) {
      this.plusActionSelected = val;
    },
    // TODO
    clickPlusDragMenu(type: NodeType) {
      const node = this.node as Node;
      const graph = node.model?.graph;
      if (graph) {
        const pos = getDownstreamNodePosition(node, graph);
        const newNode = createNode(nodes.get(type) as NodeProp, graph, pos);
        createEdge(node.id, newNode.id, graph);
      }
      this.plusActionSelected = false;
    },
    // 鼠标进入和离开时切换切换结点样式
    onMainMouseEnter() {
      const node = this.node as Node;
      node.getPorts().forEach((port) => {
        node.setPortProp(port.id as string, "attrs/circle", {
          fill: "#fff",
          stroke: "#85A5FF",
        });
      });
    },
    onMainMouseLeave() {
      const node = this.node as Node;
      node.getPorts().forEach((port) => {
        node.setPortProp(port.id as string, "attrs/circle", {
          fill: "transparent",
          stroke: "transparent",
        });
      });
    },
    onMoreActionClick() {
      eventBus.emit(EventEnum.NODE_OPEN_CONFIG_PANEL, this.node);
    },
  },

  computed: {
    name() {
      return this.data.module.name;
    },
    nodes() {
      return nodes;
    },
    CellStatus() {
      return CellStatus;
    },
    type() {
      return this.data.type;
    },
    status() {
      return this.data.status;
    },
    statusMsg() {
      return this.data.statusMsg;
    },
    iconUrl() {
      return (nodes.get(this.type) as NodeProp).icon;
    },
  },

  data() {
    return {
      plusActionSelected: false,
      node: {} as Node,
      data: null as any,
    };
  },
});
</script>

<template>
  <div class="deployment-dag-node" @dblclick="onDblclick">
    <div
      class="main-area"
      @mouseenter="onMainMouseEnter"
      @mouseleave="onMainMouseLeave"
    >
      <div class="main-info">
        <!-- 结点图标 -->
        <i class="node-logo" :style="{ backgroundImage: `url(${iconUrl})` }" />
        <!-- 若结点名称过长，则显示省咯号，并使用 tooltip 显示其完整名称 -->
        <a-tooltip v-if="name.length > 12" :title="name" :mouseEnterDelay="0.8">
          <div class="ellipsis-row node-name">
            {{ `${name.slice(0, 10)}...` }}
          </div>
        </a-tooltip>
        <div v-else class="ellipsis-row node-name">{{ name }}</div>
      </div>
      <div class="status-action">
        <!-- 结点状态图标 -->
        <a-tooltip v-show="status === CellStatus.ERROR" :title="statusMsg">
          <i class="status-icon status-icon-error" />
        </a-tooltip>
        <i
          v-show="status === CellStatus.SUCCESS"
          class="status-icon status-icon-success"
        />
        <!-- 配置面板按钮 -->
        <div class="more-action-container" @click="onMoreActionClick">
          <i class="more-action" />
        </div>
      </div>
    </div>
    <!-- 点击加号按钮时可以打开下拉菜单，可以快捷创建最近使用的节点，并且建立依赖边 -->
    <div class="plus-dag">
      <a-dropdown
        placement="bottomCenter"
        :open="plusActionSelected"
        @openChange="onPlusDropdownOpenChange"
        :trigger="['click']"
        overlayClassName="processing-node-menu"
      >
        <template #overlay>
          <ul>
            <!-- TODO: 为下拉菜单添加实际功能 -->
          </ul>
        </template>
        <i
          :class="[
            'plus-action',
            { 'plus-action-selected': plusActionSelected },
          ]"
        />
      </a-dropdown>
    </div>
  </div>
</template>

<style>
.deployment-dag-node {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.main-area {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px;
  width: 180px;
  height: 48px;
  color: rgba(0, 0, 0, 65%);
  font-size: 12px;
  font-family: PingFangSC;
  line-height: 24px;
  background-color: #fff;
  box-shadow: 0 -1px 4px 0 rgba(209, 209, 209, 50%),
    1px 1px 4px 0 rgba(217, 217, 217, 50%);
  border-radius: 2px;
  border: 1px solid transparent;
}

.main-area:hover {
  border: 1px solid rgba(0, 0, 0, 10%);
  box-shadow: 0 -2px 4px 0 rgba(209, 209, 209, 50%),
    2px 2px 4px 0 rgba(217, 217, 217, 50%);
}

.node-logo {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.node-name {
  overflow: hidden;
  display: inline-block;
  width: auto;
  margin-left: 6px;
  color: rgba(0, 0, 0, 65%);
  font-size: 12px;
  font-family: PingFangSC;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: top;
}

.status-action {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.status-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
}

.status-icon-error {
  background: url("https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ")
    no-repeat center center / 100% 100%;
}

.status-icon-success {
  background: url("https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ")
    no-repeat center center / 100% 100%;
}

.more-action-container {
  width: 15px;
  height: 15px;
  text-align: center;
  cursor: pointer;
}

.more-action {
  display: inline-block;
  width: 3px;
  height: 15px;
  background: url("https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*tFw7SIy-ttQAAAAAAAAAAAAADtOHAQ/original")
    no-repeat center center / 100% 100%;
}

.plus-dag {
  visibility: hidden;
  position: relative;
  margin-left: 12px;
  height: 48px;
}

.plus-action {
  position: absolute;
  top: calc(50% - 8px);
  left: 0;
  width: 16px;
  height: 16px;
  background: url("https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*ScX2R4ODfokAAAAAAAAAAAAADtOHAQ/original")
    no-repeat center center / 100% 100%;
  cursor: pointer;
}

.plus-action:hover {
  background-image: url("https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*tRaoS5XhsuQAAAAAAAAAAAAADtOHAQ/original");
}

.plus-action:active,
.plus-action-selected {
  background-image: url("https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*k9cnSaSmlw4AAAAAAAAAAAAADtOHAQ/original");
}

.x6-node-selected .main-area {
  border-color: #3471f9;
}

.x6-node-selected .plus-dag {
  visibility: visible;
}

.processing-node-menu {
  padding: 2px 0;
  width: 105px;
  background-color: #fff;
  box-shadow: 0 9px 28px 8px rgba(0, 0, 0, 5%), 0 6px 16px 0 rgba(0, 0, 0, 8%),
    0 3px 6px -4px rgba(0, 0, 0, 12%);
  border-radius: 2px;
}

.processing-node-menu ul {
  margin: 0;
  padding: 0;
}

.processing-node-menu li {
  list-style: none;
}

.each-sub-menu {
  padding: 6px 12px;
  width: 100%;
}

.each-sub-menu:hover {
  background-color: rgba(0, 0, 0, 4%);
}

.each-sub-menu a {
  display: inline-block;
  width: 100%;
  height: 16px;
  /* font-family: PingFangSC; */
  font-weight: 400;
  font-size: 12px;
  color: rgba(0, 0, 0, 65%);
}

.each-sub-menu span {
  margin-left: 8px;
  vertical-align: top;
}

.each-disabled-sub-menu a {
  cursor: not-allowed;
  color: rgba(0, 0, 0, 35%);
}

.node-mini-logo {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  vertical-align: top;
}

@keyframes running-line {
  to {
    stroke-dashoffset: -1000;
  }
}
</style>

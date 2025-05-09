import mitt from "mitt";

// 定义事件枚举
export enum EventEnum {
  GRAPH_INITIATED = "event-graph-initiated",
  // GRAPH_INITIATED = "event-graph-initiated",
  NODE_SELECTED = "node-selected",
  NODE_UNSELECTED = "node-unselected",
  NODE_OPEN_CONFIG_PANEL = "node-open-config-panel",
}

export const eventBus = mitt();
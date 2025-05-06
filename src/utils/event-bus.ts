import mitt from "mitt";

export enum EventEnum {
  GRAPH_INITIATED = "event-graph-initiated",
  // GRAPH_INITIATED = "event-graph-initiated",
  NODE_SELECTED = "node-selected",
  NODE_UNSELECTED = "node-unselected",
}

export const eventBus = mitt();
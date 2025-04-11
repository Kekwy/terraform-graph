import mitt from "mitt";

export namespace EVENTS {
  export const GRAPH_INITIATED = "event-graph-initiated";
}

export const EVENT_BUS = mitt();
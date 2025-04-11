import {Graph} from "@antv/x6";
import Vue from "vue";

interface State {
  graph: Graph
}

export const STATE: State = Vue.observable({
  graph: null as any,
})
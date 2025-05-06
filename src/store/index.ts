import {Graph} from "@antv/x6";
import Vue from "vue";

interface GlobalVar {
  graph: Graph
}

export const globalVar: GlobalVar = Vue.observable({
  graph: null as any,
})
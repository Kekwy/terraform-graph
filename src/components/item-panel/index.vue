<template>
  <div class="icon-page">
    <div class="icon-row">
      <div
          v-for="(item, index) in items"
          :key="index"
      >
        <item-panel-item :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import {nodes} from "@/node/types";
import ItemPanelItem from "@/components/item-panel/item.vue";

export default {
  name: "item-panel",
  components: {ItemPanelItem},
  computed: {
    items() {
      return nodes.values();
    }
  },
};
</script>

<style scoped>
.icon-page {
  padding: 20px;
  font-family: sans-serif;
}

.icon-row {
  display: flex;
  flex-wrap: wrap;
}


</style>

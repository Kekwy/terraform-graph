<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "item-panel-item",
  props: {
    item: {
      type: Object as PropType<{
        icon: string;
        type: string;
      }>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="icon-item">
    <img :src="item.icon" alt="" class="icon-img" />
    <span class="icon-label"> {{ item.type }} </span>
  </div>
</template>

<style scoped>
.icon-item {
  margin: 5px;
  display: flex;
  vertical-align: middle;
}

.icon-img {
  width: 24px;
  height: 24px;
  margin-right: 16px;
}

.icon-label {
  width: auto;
  display: flex;
  align-items: center;

}
</style>

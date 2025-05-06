<script lang="ts">
import Vue, {PropType} from "vue";

export default Vue.extend({
  name: "item-panel-item",
  props: {
    item: {
      type: Object as PropType<{
        icon: string,
        type: string,
      }>,
      required: true,
    }
  },
});

</script>

<template>
  <div class="icon-item">
    <img :src="item.icon" alt="" class="icon-img"/>
    <div class="icon-label">{{ item.type }}</div>
  </div>
</template>

<style scoped>
.icon-item {
  width: 100px;
  text-align: center;
  margin: 10px;
}

.icon-img {
  width: 36px;
  height: 36px;
  margin-bottom: 5px;
}

.icon-label {
  font-size: 12px;
  color: #333;
}
</style>
<script lang="ts">
import {defineComponent} from "vue";
import ItemPanel from "@/components/item-panel/index.vue";

export default defineComponent({
  name: "HomeView",
  components: {ItemPanel},
  data() {
    return {
      collapsed: false,
    };
  }
})
</script>

<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo"/>
      <!--      <a-menu-->
      <!--          theme="dark"-->
      <!--          mode="horizontal"-->
      <!--          :default-selected-keys="['2']"-->
      <!--          :style="{ lineHeight: '64px' }"-->
      <!--      >-->
      <!--        <a-menu-item key="1">-->
      <!--          nav 1-->
      <!--        </a-menu-item>-->
      <!--        <a-menu-item key="2">-->
      <!--          nav 2-->
      <!--        </a-menu-item>-->
      <!--        <a-menu-item key="3">-->
      <!--          nav 3-->
      <!--        </a-menu-item>-->
      <!--      </a-menu>-->
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <item-panel/>
      </a-layout-sider>
      <a-layout style="padding: 24px">
        <a-layout-content :style="{ background: 'none', padding: 0, margin: 0, minHeight: '280px' }">
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-top-side-2 {
  width: 100%;
  height: 100%;
}

#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>

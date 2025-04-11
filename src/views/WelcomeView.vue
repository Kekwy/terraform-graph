<script lang="ts">

import {defineComponent} from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
  components: {
    HelloWorld,
  },
  methods: {
    toHomeView() {
      this.$router.push({name:'home'});
    }
  }
})
</script>

<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png">
    <div id="app-content">
      <a-button @click="toHomeView">进入主页</a-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
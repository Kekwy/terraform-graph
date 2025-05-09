<script lang="ts">
import {useRoute} from "vue-router/composables";
import Vue from "vue";
import {Route} from "vue-router";
import {generate} from "@/utils/code";
import {refreshNodeStatus} from "@/utils/graph-util";

export default Vue.extend({
  name: "designer-tool-bar",
  data() {
    return {
      loading: false as any,
    }
  },
  computed: {
    route(): Route {
      return useRoute();
    },
    currentRoute(): string | undefined | null {
      return this.route.name;
    }
  },
  methods: {
    onClickRefreshButton() {
      refreshNodeStatus();
    },
    onClickDownloadButton() {
      this.loading = {delay: 500};
      generate().then(() => {
        this.loading = false;
      });
      console.log('Service Endpoint clicked');
    },
    handleRecycle() {
      console.log('Recycle clicked');
    }
  }
});
</script>

<template>
  <div class="toolbar-container">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <!-- 左侧选择区域 -->
      <div class="left-section">
        <!--  TODO: 待加入实际功能      -->
        <a-dropdown style="width: 120px" :trigger="['click']" :disabled="true">
          <a-menu slot="overlay" style="user-select: none;  /* 标准属性 */
                                        -webkit-user-select: none; /* Chrome/Safari */
                                        -moz-user-select: none;    /* Firefox */
                                        -ms-user-select: none;     /* IE10+ */"
                  :selectedKeys="[currentRoute]">
            <a-menu-item key="1"> Redis</a-menu-item>
            <a-menu-item key="2"> MySQL</a-menu-item>
            <a-menu-item key="3"> Zookeeper</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px"> Unknown
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
        <!--  TODO: 待加入实际功能      -->
        <a-select
            :disabled="true"
            style="width: 140px; margin-left: 10px"
            placeholder="Unknown"
        >
          <a-select-option value="comp1">Unknown</a-select-option>
        </a-select>
        <!--  TODO: 待加入实际功能      -->
        <a-tag color="green" style="margin-left: 10px">
          <a-icon type="check-circle"/>
          Unknown
        </a-tag>
      </div>

      <!-- 右侧按钮区域 -->
      <!-- 重置画布中结点状态的按钮 -->
      <div class="right-section">
        <a-button
            style="border-color: #1890ff; color: #1890ff"
            size="small"
            @click="onClickRefreshButton"
        >
          <a-icon type="reload"/>
          重置
        </a-button>

        <a-button
            type="primary"
            style="margin-left: 10px"
            size="small"
            @click="onClickDownloadButton"
            :loading="loading"
        >
          <a-icon type="download" v-if="!loading"/>
          生成代码
        </a-button>

        <a-button
            :disabled="true"
            type="danger"
            style="margin-left: 10px"
            size="small"
            @click="handleRecycle"
        >
          Unknown
        </a-button>
      </div>
    </div>

    <!--    &lt;!&ndash; 底部选项卡 &ndash;&gt;-->
    <!--    <div class="tabs-section">-->
    <!--      <a-tabs-->
    <!--          v-model="activeTab"-->
    <!--          :tabBarStyle="{ marginBottom: 0 }"-->
    <!--      >-->
    <!--        <a-tab-pane tab="Overview" key="overview" />-->
    <!--        <a-tab-pane tab="Resource Graph" key="resourceGraph" />-->
    <!--      </a-tabs>-->
    <!--    </div>-->
  </div>
</template>

<style scoped>
.toolbar-container {
  padding: 8px;
  background: #fff;
  height: 48px;
  margin-bottom: 16px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*border-bottom: 1px solid #f0f0f0;*/
  background: none;
}

.left-section {
  display: flex;
  align-items: center;
  background: none;
}

.right-section {
  display: flex;
  align-items: center;
}

.tabs-section {
  margin-top: -8px;
}

/* 蓝色选中状态 */
.tabs-section >>> .ant-tabs-bar {
  border-bottom: none;
}

.tabs-section >>> .ant-tabs-tab-active {
  color: #1890ff;
  font-weight: 500;
}

/* 绿色状态标签 */
.toolbar >>> .ant-tag-green {
  color: #52c41a;
  background: #f6ffed;
  border-color: #b7eb8f;
  font-weight: 500;
}
</style>
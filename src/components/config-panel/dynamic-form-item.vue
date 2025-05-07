<!--suppress SuspiciousTypeOfGuard -->
<script lang="ts">
import Vue, {PropType} from "vue";
import {Ref} from "@/utils/ref";
import {Variable} from "@/node/types";

export default Vue.extend({
  name: "dynamic-form-item",
  props: {
    modelRef: {
      type: null as unknown as PropType<Ref<any>>,
      required: true,
    },
    text: {
      type: Object,
      required: false,
    },
    fixed: {
      type: Set<string>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    }
  },
  computed: {
    Variable() {
      return Variable
    },
    model(): any {
      return this.modelRef.value || {};
    }
  },
  methods: {
    handleClose(key: string, index: number) {
      let array = this.model[key] as any[];
      array.splice(index, 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        const inputComponent = this.$refs.inputRef as Vue & { focus: () => void };
        if (inputComponent && inputComponent.focus) {
          inputComponent.focus();
        }
      });
    },

    handleInputChange(e: any) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm(key: string) {
      console.log(key);
      const inputValue = this.inputValue;
      if (inputValue.length > 0) {
        let array = this.model[key] as any[];
        array.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
  data() {
    return {
      // 数组表单项相关
      inputVisible: false,
      inputValue: ''
    }
  }
});
</script>

<template>
  <div>
    <template v-for="key in Object.keys(model)">
      <!-- 普通字段（非对象） -->
      <a-form-item
          v-if="typeof model[key] !== 'object' || Array.isArray(model[key]) ||  model[key] instanceof Variable"
          :key="key"
          :label="text[key] || key">
        <!-- 字符串 -->
        <a-input v-if="typeof model[key] === 'string'" v-model="model[key]"
                 :disabled="fixed.has(key) || disabled"/>
        <!-- 数字 -->
        <a-input-number v-else-if="typeof model[key] === 'number'" v-model="model[key]" :min="0"
                        :disabled="fixed.has(key) || disabled"/>
        <!-- 数组 -->
        <div v-else-if="Array.isArray(model[key])">
          <template v-for="(element, index) in model[key]">
            <a-tooltip v-if="element.length > 20" :key="element" :title="element">
              <a-tag :key="element" :closable="!fixed.has(key) && !disabled" @close="handleClose(key, index)">
                {{ `${element.slice(0, 20)}...` }}
              </a-tag>
            </a-tooltip>
            <a-tag v-else :key="element" :closable="!fixed.has(key) && !disabled" @close="handleClose(key, index)">
              {{ element }}
            </a-tag>
          </template>
          <a v-if="!fixed.has(key) && !disabled">
            <a-input
                v-if="inputVisible"
                ref="inputRef"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                :value="inputValue"
                autoFocus
                @change="handleInputChange"
                @blur="handleInputConfirm(key)"
                @keyup.enter="handleInputConfirm(key)"
            />
            <!--suppress CssUnknownProperty -->
            <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
              <a-icon type="plus"/>
              New Tag
            </a-tag>
          </a>
        </div>
        <!-- 变量 -->
        <a-input v-else-if="model[key] instanceof Variable" v-model="model[key].value"
                 :disabled="fixed.has(key) || disabled"/>
        <!-- 默认 fallback -->
        <span v-else>不支持的类型</span>
      </a-form-item>
      <!-- 嵌套对象（子表单） -->
      <a-collapse v-else :key="key" :bordered="false" style="margin-bottom: 24px; background: none">
        <a-collapse-panel :header="text[key] || key">
          <dynamic-form-item
              :fixed="fixed"
              :model-ref="{ value: model[key] }"
              :text="text"
              :disabled="fixed.has(key) || disabled"
          />
        </a-collapse-panel>
      </a-collapse>
    </template>
  </div>
</template>

<style scoped>

</style>
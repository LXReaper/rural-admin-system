<template>
  <!--  文本编辑器-->
  <div :style="{ border: props.border, zIndex: 2 }">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      v-if="!props.readOnly"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :style="{
        height: `${props.height}`,
        maxWidth: `${props.width}`,
        overflowY: 'hidden',
      }"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
</template>
<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  withDefaults,
  defineProps,
  watch,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

interface Props {
  valueHtml: string;
  placeholder: string;
  readOnly: boolean;
  maxLength: number;
  showWordCount: boolean;
  height: string;
  width: string;
  border: string;
  handleChangeText: (v: string) => void;
  handleChangeHtml: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  valueHtml: () => "", //文本内容
  placeholder: () => "请输入内容...", //提示内容
  readOnly: true, //是否只读
  maxLength: 2000, //文本内容最大数量
  showWordCount: false, //是否显示字数提示
  height: "300px", //编辑器的高度
  width: "670px", //编辑器的宽度
  border: "1px solid #ccc", //展示边框
  handleChangeText: (v: string) => {
    //外部获取编辑器组件中的Text内容
    console.log(v);
  },
  handleChangeHtml: (v: string) => {
    //外部获取编辑器组件中的Html内容
    console.log(v);
  },
});
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML（文本框中的内容）
const valueHtml = ref(props.valueHtml);

//模式
const mode = ref("default"); //simple
//工具栏配置
const toolbarConfig = {};
//编辑器配置
const editorConfig = {
  placeholder: props.placeholder,
  readOnly: props.readOnly,
  maxLength: props.maxLength,
  showWordCount: props.showWordCount,
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

/**
 * 监听props.valueHtml变化
 */
watch(
  () => props.valueHtml,
  () => {
    valueHtml.value = props.valueHtml;
  }
);
/**
 * 创建事件
 * @param editor
 */
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
/**
 * 编辑器中的文字发生变化
 * @param editor
 */
const handleChange = (editor: any) => {
  console.log(editor.getHtml());
  props.handleChangeText(editor.getText());
  props.handleChangeHtml(editor.getHtml()); //.replace(/<p>/g, "<div>").replace(/<\/p>/g, "</div>")
};
const handleDestroyed = (editor: any) => {
  console.log("destroyed", editor);
};
const handleFocus = (editor: any) => {
  console.log("focus view", editor);
};
const handleBlur = (editor: any) => {
  console.log("blur view", editor);
};
const customAlert = (info: any, type: any) => {
  alert(`【自定义提示】${type} - ${info}`);
};
const customPaste = (editor: any, event: any, callback: any) => {
  console.log("ClipboardEvent 粘贴事件对象", event);
};
</script>

<style scoped></style>

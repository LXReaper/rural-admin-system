<template>
  <div id="ProtocolSetting">
    <el-row>
      <el-col :span="15">
        <my-editor
          :height="'57.5vh'"
          :width="'51vw'"
          :max-length="15000"
          :value-html="props.protocolContent"
          :handle-change-html="(v) => props.handChangeContent(v)"
        />
      </el-col>
      <el-col style="margin-left: 1vw" :span="3">
        <protocol-preview
          :height="'64vh'"
          :content="props.protocolContent"
          :title="props.title"
        />
      </el-col>
    </el-row>
    <div class="save">
      <el-button
        @click="updateProtocol"
        color="#0256ff"
        type="primary"
        style="position: absolute; top: 5vh"
        >保存
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import ProtocolPreview from "@/components/setting/protocolSetting/protocolPreview.vue";
import { withDefaults, defineProps, watch } from "vue";
import MyEditor from "@/components/wangEditor/myEditor.vue";
import { SysConfigControllerService } from "../../../../generated/services/SysConfigControllerService";
import store from "@/store";
import { ElMessage, ElNotification } from "element-plus";

interface Props {
  protocolContent: string; //协议内容
  handChangeContent: (v: string) => void; //传递参数给父组件
  title: string; //协议标题
  type: string; //协议类型
}

const props = withDefaults(defineProps<Props>(), {
  protocolContent: "",
  handChangeContent: (v: string) => {
    console.log();
  },
  title: "协议预览",
  type: "",
});

/*更新协议数据*/
const updateProtocol = async () => {
  const res = await SysConfigControllerService.updateProtocolUsingPost({
    user_id: store.state.user.loginUser.villager_id,
    content: props.protocolContent,
    type: props.type,
  });
  if (res.code === 0) {
    ElNotification.success("协议更新成功");
  } else ElMessage.error("协议更新失败，" + res.message);
};
</script>

<style scoped>
#ProtocolSetting {
}

.save {
  z-index: 1;
  opacity: 85%;
  backdrop-filter: blur(10px);
  position: fixed;
  margin-left: -1vw;
  width: 85vw;
  height: 14vh;
  background-color: white;
  text-align: center;
}
</style>

<template>
  <div id="checkInConfig">
    <el-form>
      <el-form-item :label="'签到开关：'">
        <div style="white-space: pre-wrap">
          <el-radio-group v-model="checkInConfigForm.checkInSwitch">
            <el-radio :value="1">开启</el-radio>
            <el-radio :value="0">关闭</el-radio>
          </el-radio-group>
          <div class="tips-info">
            签到开关，小程序是否开启签到功能，关闭后隐藏签到入口
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="'签到模式：'">
        <div style="white-space: pre-wrap">
          <el-radio-group v-model="checkInConfigForm.checkInModel">
            <el-radio :value="0">无限制</el-radio>
            <el-radio :value="1">周循环</el-radio>
            <el-radio :value="2">月循环</el-radio>
          </el-radio-group>
          <div class="tips-info">
            无限制，累积和连续签到不会清零，周循环，每周一会清理累积和连续的记录为0，重新开启计算，月循环，每月一号会清理累积和连续的记录为0，重新开启计算
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="'签到提醒：'">
        <div style="white-space: pre-wrap">
          <el-radio-group v-model="checkInConfigForm.checkInRemind">
            <el-radio :value="1">开启</el-radio>
            <el-radio :value="0">关闭</el-radio>
          </el-radio-group>
          <div class="tips-info">
            是否开启签到提醒，提醒方式为公众号以及小程序站内信
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="'签到赠送积分：'">
        <div style="white-space: pre-wrap">
          <el-input
            v-model="checkInConfigForm.checkInPoint"
            style="width: 20vw"
          />
          <div class="tips-info">签到赠送积分，每日签到赠送的积分值</div>
        </div>
      </el-form-item>
      <el-form-item :label="'签到赠送经验：'">
        <div style="white-space: pre-wrap">
          <el-input
            v-model="checkInConfigForm.checkInExperience"
            style="width: 20vw"
          />
          <div class="tips-info">签到赠送用户经验值</div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="submit"
          color="#0256ff"
          type="primary"
          style="margin-left: 5vw"
          >提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, ref, watch, withDefaults } from "vue";
import { SysConfigControllerService } from "../../../../../generated/services/SysConfigControllerService";
import { ElLoading, ElMessage, ElNotification } from "element-plus";
import store from "@/store";

interface Props {
  search: boolean; //判断是否跳转到该页面
}

const props = withDefaults(defineProps<Props>(), {
  search: false,
});

//签到配置表单
const checkInConfigForm = ref({
  checkInSwitch: 0,
  checkInModel: 0,
  checkInRemind: 0,
  checkInPoint: 1,
  checkInExperience: 0,
});

//获取签到配置信息
const getCheckInConfig = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "玩命加载中...",
    background: "rgba(0, 0, 0, 0.1)",
  }); //创建加载动画
  const res = await SysConfigControllerService.getCheckInConfigUsingGet();
  if (res.code === 0) {
    checkInConfigForm.value.checkInSwitch = res.data.checkInOpen;
    checkInConfigForm.value.checkInModel = res.data.checkInModel;
    checkInConfigForm.value.checkInRemind = res.data.checkInRemind;
    checkInConfigForm.value.checkInPoint = res.data.checkInPoint;
    checkInConfigForm.value.checkInExperience = res.data.checkInExperience;
  } else ElMessage.error("签到配置加载失败");
  loading.close(); //关闭加载
};

//监听外部tabs是否选中了此页面
watch(
  () => props.search,
  () => {
    //每次进入该页面就加载一次ai配置
    if (props.search) getCheckInConfig();
  }
);
onMounted(() => {
  getCheckInConfig();
});

/*
 * 更新配置信息
 */
const submit = () => {
  updateCheckInConfig().then((res) => {
    if (res) ElNotification.success("签到配置更新成功");
    else return;
  });
};

//更新签到配置
const updateCheckInConfig = async () => {
  const res = await SysConfigControllerService.updateCheckInConfigUsingPost({
    checkInOpen: checkInConfigForm.value.checkInSwitch,
    checkInModel: checkInConfigForm.value.checkInModel,
    checkInRemind: checkInConfigForm.value.checkInRemind,
    checkInPoint: checkInConfigForm.value.checkInPoint,
    checkInExperience: checkInConfigForm.value.checkInExperience,
    userId: store.state.user.loginUser.villager_id,
  });
  if (res.code !== 0) {
    ElMessage.error("更新失败，" + res.message);
    return false;
  } else await getCheckInConfig();
  return true;
};
</script>

<style scoped>
.tips-info {
  line-height: 18px;
  margin-top: 3px;
  color: #c0c4cc;
  font-size: 12px;
}
</style>

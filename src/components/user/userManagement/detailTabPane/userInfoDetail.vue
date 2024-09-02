<template>
  <div id="userInfoDetail">
    <!--    基本信息部分-->
    <div class="section">
      <div class="section-hd" style="font-weight: bolder; font-size: 110%">
        基本信息
      </div>
      <el-row style="margin-top: 2vh">
        <el-col :span="8">用户ID： 11111</el-col>
        <el-col :span="8">真实姓名： 1111</el-col>
        <el-col :span="8">手机号码： 1111</el-col>
      </el-row>
      <el-row style="margin-top: 2vh">
        <el-col :span="8">生日： -</el-col>
        <el-col :span="8">身份证号： -</el-col>
        <el-col :span="8">用户地址： -</el-col>
      </el-row>
    </div>
    <!--    密码部分-->
    <div class="section">
      <div class="section-hd" style="font-weight: bolder; font-size: 110%">
        密码
      </div>
      <el-row style="margin-top: 2vh">
        <el-col :span="8">登录密码： -</el-col>
      </el-row>
    </div>
    <!--    用户概况部分-->
    <div class="section">
      <div class="section-hd" style="font-weight: bolder; font-size: 110%">
        用户概况
      </div>
      <el-row style="margin-top: 2vh">
        <el-col :span="8">注册时间： 2024-08-24 11:46:43</el-col>
        <el-col :span="8">登录时间： 2024-08-24 11:47:57</el-col>
      </el-row>
    </div>
    <!--    用户备注部分-->
    <div class="section">
      <div class="section-hd" style="font-weight: bolder; font-size: 110%">
        用户备注
      </div>
      <el-row style="margin-top: 2vh">
        <el-col :span="8">备注： -</el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped>
#userInfoDetail {
}

.section {
  padding: 25px 0;
  border-bottom: 1px dashed rgb(238, 238, 238);
}

.section-hd {
  padding-left: 10px;
  border-left: 3px solid #0256ff;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgb(48, 49, 51);
}
</style>

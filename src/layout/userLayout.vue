<template>
  <div id="userLayout">
    <el-form ref="loginForm" class="login-form">
      <h3 class="title">乡村积分治理后台管理系统</h3>
      <el-form-item prop="userAccount">
        <el-input
          v-model="userAccount"
          type="text"
          placeholder="请输入管理员账号"
          @keyup.enter="handleLogin"
        />
      </el-form-item>
      <el-form-item prop="userPassword">
        <el-input
          v-model="userPassword"
          type="password"
          placeholder="请输入管理员密码"
          @keyup.enter="handleLogin"
        />
      </el-form-item>
      <!--      <el-form-item prop="code" v-if="captchaEnabled">-->
      <!--        <el-input-->
      <!--          v-model="loginForm.code"-->
      <!--          auto-complete="off"-->
      <!--          placeholder="验证码"-->
      <!--          style="width: 63%"-->
      <!--          @keyup.enter.native="handleLogin"-->
      <!--        >-->
      <!--          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />-->
      <!--        </el-input>-->
      <!--        <div class="login-code">-->
      <!--          <img :src="codeUrl" @click="getCode" class="login-code-img"/>-->
      <!--        </div>-->
      <!--      </el-form-item>-->
      <el-checkbox v-model="rememberMe" style="margin: 0 0 25px 0"
        >记住密码
      </el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <!--        <div style="float: right" v-if="register">-->
        <!--          <router-link class="link-type" :to="'/register'"-->
        <!--            >立即注册-->
        <!--          </router-link>-->
        <!--        </div>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { UserControllerService, type UserLoginRequest } from "../../generated";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import AuthorityCtrl from "@/access/authorityCtrl";

const router = useRouter();
const loading = ref(false);
const userAccount = ref("");
const userPassword = ref("");
const rememberMe = ref(false);
const handleLogin = async () => {
  const res = await UserControllerService.userLoginUsingPost({
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  } as UserLoginRequest);
  if (res.code === 0) {
    if (res.data.userRole !== AuthorityCtrl.ADMIN) {
      ElMessage.warning("仅允许管理员登录");
      await UserControllerService.userLogoutUsingPost();
      return;
    }
    ElMessage.success("登录成功");
    await router.push({
      path: "/home",
      replace: false,
    });
  } else {
    ElMessage.error("登录失败，" + res.message);
  }
};
</script>

<style>
#userLayout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 98vh;
  background-image: url("../assets/login/login-background.jpg");
  background-size: cover;
}

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  height: 400px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.25);
  width: 400px;
  padding: 25px 25px 5px 25px;
  box-sizing: border-box;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}
</style>

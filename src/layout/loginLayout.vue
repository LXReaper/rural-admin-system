<template>
  <div id="loginLayout">
    <div class="box">
      <form autocomplete="off">
        <h2>登录</h2>
        <div class="inputBox">
          <input
            type="text"
            v-model="loginForm.userAccount"
            required="required"
          />
          <span>账号</span>
          <i></i>
        </div>
        <div class="inputBox">
          <input
            type="password"
            v-model="loginForm.userPassword"
            required="required"
          />
          <span>密码</span>
          <i></i>
        </div>
        <div class="links">
          <a href="#">忘记密码 ?</a>
          <a href="#">注册</a>
        </div>
        <input @click="handleLogin" type="button" value="登录" />
      </form>
    </div>
    <!--    <el-form v-model="loginForm" class="login-form" :rules="rules">-->
    <!--      <h3 class="title">乡村积分治理后台管理系统</h3>-->
    <!--      <el-form-item prop="userAccount">-->
    <!--        <el-input-->
    <!--          v-model="loginForm.userAccount"-->
    <!--          type="text"-->
    <!--          placeholder="请输入管理员账号"-->
    <!--          @keydown.enter="handleLogin"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item prop="userPassword">-->
    <!--        <el-input-->
    <!--          v-model="loginForm.userPassword"-->
    <!--          type="password"-->
    <!--          placeholder="请输入管理员密码"-->
    <!--          @keydown.enter="handleLogin"-->
    <!--        />-->
    <!--      </el-form-item>-->
    <!--      <el-checkbox v-model="rememberMe" style="margin: 0 0 25px 0"-->
    <!--        >记住密码-->
    <!--      </el-checkbox>-->
    <!--      <el-form-item style="width: 100%">-->
    <!--        <el-button-->
    <!--          :loading="loading"-->
    <!--          size="default"-->
    <!--          type="primary"-->
    <!--          style="width: 100%"-->
    <!--          @click="handleLogin"-->
    <!--        >-->
    <!--          <span v-if="!loading">登 录</span>-->
    <!--          <span v-else>登 录 中...</span>-->
    <!--        </el-button>-->
    <!--        &lt;!&ndash;        <div style="float: right" v-if="register">&ndash;&gt;-->
    <!--        &lt;!&ndash;          <router-link class="link-type" :to="'/register'"&ndash;&gt;-->
    <!--        &lt;!&ndash;            >立即注册&ndash;&gt;-->
    <!--        &lt;!&ndash;          </router-link>&ndash;&gt;-->
    <!--        &lt;!&ndash;        </div>&ndash;&gt;-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { UserControllerService, UserLoginRequest } from "../../generated";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import AuthorityCtrl from "@/access/authorityCtrl";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const loading = ref(false);
const loginForm = ref({
  userAccount: "",
  userPassword: "",
});
const rememberMe = ref(false);
//规则
const rules = ref({
  userAccount: [{ required: true, message: "输入管理员账号", trigger: "blur" }],
  userPassword: [
    { required: true, message: "输入管理员密码", trigger: "blur" },
  ],
});
const handleLogin = async () => {
  const res = await UserControllerService.userLoginUsingPost({
    userAccount: loginForm.value.userAccount,
    userPassword: loginForm.value.userPassword,
  } as UserLoginRequest);
  if (res.code === 0) {
    if (res.data.userRole !== AuthorityCtrl.ADMIN) {
      ElMessage.warning("仅允许管理员登录");
      await UserControllerService.userLogoutUsingPost();
      return;
    }
    ElMessage.success("登录成功");
    await store.dispatch("user/getLoginUser");
    await router.push({
      path: "/home/workplace",
      replace: false,
    });
  } else {
    ElMessage.error("登录失败，" + res.message);
  }
};
</script>

<style>
#loginLayout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../assets/login/technologyBackground.jpg");
  background-size: cover;
  overflow-y: hidden;
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

<style scoped>
/*主要登录面板*/
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background: #23242a;
}

.box {
  position: relative;
  width: 380px;
  height: 420px;
  background: #1c1c1c;
  border-radius: 8px;
  overflow: hidden;
}

.box::before {
  content: "";
  z-index: 1;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 380px;
  height: 420px;
  transform-origin: bottom right;
  background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
  animation: animate 6s linear infinite;
}

.box::after {
  content: "";
  z-index: 1;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 380px;
  height: 420px;
  transform-origin: bottom right;
  background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
  animation: animate 6s linear infinite;
  animation-delay: -3s;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

form {
  position: absolute;
  inset: 2px;
  background: #28292d;
  padding: 50px 40px;
  border-radius: 8px;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

h2 {
  color: #45f3ff;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.1em;
}

.inputBox {
  position: relative;
  width: 300px;
  margin-top: 35px;
}

.inputBox input {
  position: relative;
  width: 100%;
  padding: 20px 10px 10px;
  background: transparent;
  outline: none;
  box-shadow: none;
  border: none;
  color: #23242a;
  font-size: 1em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  z-index: 10;
}

.inputBox span {
  position: absolute;
  left: 0;
  padding: 20px 0px 10px;
  pointer-events: none;
  font-size: 1em;
  color: #8f8f8f;
  letter-spacing: 0.05em;
  transition: 0.5s;
}

.inputBox input:valid ~ span,
.inputBox input:focus ~ span {
  color: #45f3ff;
  transform: translateX(0px) translateY(-34px);
  font-size: 0.75em;
}

.inputBox i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #45f3ff;
  border-radius: 4px;
  overflow: hidden;
  transition: 0.5s;
  pointer-events: none;
  z-index: 9;
}

.inputBox input:valid ~ i,
.inputBox input:focus ~ i {
  height: 44px;
}

.links {
  display: flex;
  justify-content: space-between;
}

.links a {
  margin: 10px 0;
  font-size: 0.75em;
  color: #8f8f8f;
  text-decoration: beige;
}

.links a:hover,
.links a:nth-child(2) {
  color: #45f3ff;
}

input[type="button"] {
  border: none;
  outline: none;
  padding: 11px 25px;
  background: #45f3ff;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  width: 100px;
  margin-top: 10px;
}

input[type="button"]:active {
  opacity: 0.8;
}
</style>

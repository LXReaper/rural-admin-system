import router from "@/router";
import store from "@/store";
import AuthorityCtrl from "@/access/authorityCtrl";
import checkAuthority from "@/access/checkAuthority";

//路由跳转前
router.beforeEach(async (to, from, next) => {
  let loginUser = store.state.user.loginUser; // 获取当前前端保存的登录用户信息
  // 如果之前没有登录,则自动登录
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser"); // 从后端获取登录用户信息
    loginUser = store.state.user.loginUser; // 更新存放在前端的登录用户信息
  }

  //获取当前页面需要的访问权限
  const needAccess = (to.meta?.access as string) ?? AuthorityCtrl.NOT_LOGIN;
  //当前页面必须管理员才可以访问
  if (needAccess !== AuthorityCtrl.ADMIN) {
    //如果没登录,就跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === AuthorityCtrl.NOT_LOGIN
    ) {
      next(`/user?redirect=${to.fullPath}`);
      return;
    }

    //如果已经登录了,但是权限不足,则不跳转
    if (!checkAuthority(loginUser, AuthorityCtrl.ADMIN)) {
      return;
    }
  }
  next(); //给跳转
});

<template>
  <div id="tags-view-container" class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :ref="tags"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        :style="activeStyle(tag)"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
      >
        <el-space direction="horizontal">
          <text>{{ tag.title }}</text>
          <el-icon
            v-if="!isAffix(tag)"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)"
          >
            <Close />
          </el-icon>
        </el-space>
      </router-link>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import store from "@/store";
import { useRoute } from "vue-router";
import router, { routes } from "@/router";
import tab from "@/plugin/tab";

import { Close } from "@element-plus/icons-vue";
import path from "path";

//当前router-link实例
const tags = ref();
// 获取当前路由
const route = useRoute();
//获取全局设置的主题颜色
const theme = computed(() => store.state.settings.theme);
// 浏览过的路由信息数组
const visitedViews = computed(() => store.state.tagsView.visitedViews);

/**
 * 是否黏在上面，即是否不显示关闭按钮
 * @param tag
 */
const isAffix = (tag: any) => {
  return tag.meta && tag.meta.affix;
};

/**
 * 当前路由到的页面是否是当前导航栏选中的页面
 * @param routeToCheck 当前的路由
 */
const isActive = (routeToCheck: any) => {
  return routeToCheck.path === route.path;
};

/**
 * tags的样式设置
 * @param tag
 */
const activeStyle = (tag: any) => {
  if (!isActive(tag)) return {}; //不是被选中的就不需要修改样式
  return {
    "background-color": theme,
    "border-color": theme,
  };
};

onMounted(() => {
  initTags();
  addTags();
});
//监听路由变化
watch(
  () => router.currentRoute.value,
  () => {
    addTags();
    moveToCurrentTag();
  }
);

//过滤路由，得到需要固定标签的路由
const filterAffixTags = (routes: any, basePath = "/") => {
  let tags: any[] = [];
  routes.forEach((route: any) => {
    if (route.meta && route.meta.affix) {
      const tagPath = basePath + route.path;
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    //有子路径
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path); //返回一个子路径
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
};
const initTags = () => {
  store.dispatch("tagsView/delAllVisitedViews");
  const affixTags = filterAffixTags(routes);
  for (const tag of affixTags) {
    // 必须有名称
    if (tag.name) {
      store.dispatch("tagsView/addVisitedView", tag);
    }
  }
};
/**
 * 添加一个访问过页面标签
 */
const addTags = () => {
  const { name } = route;
  if (name) {
    store.dispatch("tagsView/addView", route);
    // if (route.meta.link) {
    //   store.dispatch("tagsView/addIframeView", route);
    // }
  }
  return false;
};

const moveToCurrentTag = () => {
  const tagsList = tags.value;
  nextTick(() => {
    for (const tag of tagsList) {
      if (tag.to.path === route.path) {
        // this.$refs.scrollPane.moveToTarget(tag);
        // when query is different then update
        if (tag.to.fullPath !== route.fullPath) {
          store.dispatch("tagsView/updateVisitedView", route);
        }
        break;
      }
    }
  });
};

/**
 * 回到前一个访问路径
 * @param visitedViews
 * @param view
 */
const toLastView = (visitedViews: any, view: any) => {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView) {
    router.push(latestView.fullPath);
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === "Dashboard") {
      // to reload home page
      router.replace({ path: "/redirect" + view.fullPath });
    } else {
      router.push("/");
    }
  }
};

/**
 * 关闭当前选中的标签页
 * @param view
 */
const closeSelectedTag = (view: any) => {
  tab.closePage(view).then((res: any) => {
    const visitedViews = res.visitedViews;
    if (isActive(view)) {
      toLastView(visitedViews, view);
    }
  });
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #d8dce5;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      text-decoration: none;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #0256ff;
        color: #fff;
        border-color: #0256ff;

        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//重新设置element css中的el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>

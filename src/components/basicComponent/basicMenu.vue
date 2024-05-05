<template>
  <div id="basicMenu">
    <el-menu
      default-active="/home"
      :collapse="props.isCollapse"
      :collapse-transition="false"
      :router="true"
      class="el-menu-vertical-demo"
    >
      <el-menu-item index="/home">
        <el-icon>
          <House />
        </el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-menu-item index="/Info/user">
        <el-icon>
          <User />
        </el-icon>
        <template #title>居民信息</template>
      </el-menu-item>
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <Star />
          </el-icon>
          <span>积分中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/points/records">
            <el-icon>
              <StarFilled />
            </el-icon>
            积分记录
          </el-menu-item>
          <el-menu-item index="/points/rules">
            <el-icon>
              <Stamp />
            </el-icon>
            积分规则
          </el-menu-item>
          <el-menu-item index="/points/checkIn">
            <el-icon>
              <CircleCheckFilled />
            </el-icon>
            签到记录
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon>
            <House />
          </el-icon>
          <span>任务中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/task/info">
            <el-icon>
              <List />
            </el-icon>
            任务信息
          </el-menu-item>
          <el-menu-item index="/task/records">
            <el-icon>
              <Checked />
            </el-icon>
            任务记录
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>
          <el-icon>
            <Reading />
          </el-icon>
          <span>学习中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/study/materials">
            <el-icon>
              <Notebook />
            </el-icon>
            学习资料
          </el-menu-item>
          <el-menu-item index="/study/state">
            <el-icon>
              <Checked />
            </el-icon>
            学习状态
          </el-menu-item>
          <el-menu-item index="/study/records">
            <el-icon>
              <Document />
            </el-icon>
            学习记录
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="6">
        <template #title>
          <el-icon>
            <ShoppingCart />
          </el-icon>
          <span>商品信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/shop/goods">
            <el-icon>
              <GoodsFilled />
            </el-icon>
            积分商品
          </el-menu-item>
          <el-menu-item index="/shop/transaction">
            <el-icon>
              <DataBoard />
            </el-icon>
            交易记录
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="/comments">
        <el-icon>
          <Comment />
        </el-icon>
        <template #title>评论信息</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import {
  Checked,
  CircleCheckFilled,
  Comment,
  DataBoard,
  Document,
  GoodsFilled,
  House,
  List,
  Notebook,
  Reading,
  ShoppingCart,
  Stamp,
  Star,
  StarFilled,
  User,
} from "@element-plus/icons-vue";
import { ref, withDefaults, defineProps } from "vue";

interface Props {
  isCollapse: boolean; //是否收起侧边栏
}

const props = withDefaults(defineProps<Props>(), {
  isCollapse: () => false,
});
</script>

<style>
.el-menu-vertical-demo {
  width: 200px;
  min-height: 98vh;
}

#basicMenu {
  min-height: 98vh;
  height: 98vh;
}
</style>

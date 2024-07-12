<template>
  <div id="CommentInfoView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="评论内容" prop="comment_content">
        <el-input
          v-model="queryParams.comment_content"
          placeholder="请输入评论内容"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="评论者" prop="commenter_id">
        <el-input
          v-model="queryParams.commenter_id"
          placeholder="请输入评论者ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="被评论者" prop="commented_user_id">
        <el-input
          v-model="queryParams.commented_user_id"
          placeholder="请输入被评论者ID"
          clearable
          @keyup.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="handleQueryDebounce"
          >搜索
        </el-button>
        <el-button size="default" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!--    表格-->
    <el-table v-loading="loading" :data="commentsList">
      <el-table-column label="评论ID" align="center" prop="commentId" />
      <el-table-column label="评论内容" align="center" prop="commentContent" />
      <el-table-column label="评论者ID" align="center" prop="commenterId" />
      <el-table-column
        label="评论者头像"
        align="center"
        prop="commenterAvatar"
      />
      <el-table-column
        label="被评论者ID"
        align="center"
        prop="commentedUserId"
      />
      <el-table-column
        label="被评论者头像"
        align="center"
        prop="commentedUserAvatar"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column label="父评论ID" align="center" prop="parentCommentId" />
    </el-table>

    <!--    分页-->
    <el-pagination
      v-show="total > 0"
      background
      :currentPage="queryParams.current"
      :page-size="total"
      :page-count="Math.ceil(total / queryParams.pageSize)"
      :total="Math.ceil(total / queryParams.pageSize)"
      layout="total, size, prev, pager, next, jumper"
      @current-change="pageHandleChange"
      class="mt-4"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import { ElPagination } from "element-plus";

//总数
const total = ref(0);
//是否加载
const loading = ref(true);
//显示搜索条件
const showSearch = ref(true);
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  comment_content: "",
  commenter_id: "",
  commented_user_id: "",
});
//查询得到的数据
const commentsList = ref([]);

//查询数据
const handleQuery = () => {
  loading.value = true;
  console.log();
  loading.value = false;
};
const handleQueryDebounce = debounce(handleQuery, 500);
onMounted(() => {
  handleQuery();
});
//重置
const resetQuery = () => {
  console.log();
};
//分页触发事件
const pageHandleChange = (value: number) => {
  queryParams.value.current = value;
  handleQuery();
};
</script>

<style scoped>
#CommentInfoView {
}
</style>

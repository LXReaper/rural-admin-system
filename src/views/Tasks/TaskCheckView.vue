<template>
  <div id="TaskExamineView">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="提交用户" prop="user_name">
        <el-input
          v-model="queryParams.user_name"
          placeholder="请输入用户名"
          clearable
          @keydown.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="任务内容" prop="task_content">
        <el-input
          v-model="queryParams.task_content"
          placeholder="请输入任务完成内容"
          clearable
          @keydown.enter="handleQueryDebounce"
        />
      </el-form-item>
      <el-form-item label="是否通过" prop="is_accepted">
        <el-select
          v-model="queryParams.is_accepted"
          placeholder="请选择审核状态"
          @change="handleQueryDebounce"
          size="default"
          style="width: 240px"
        >
          <el-option
            v-for="item in [
              { value: '', label: '所有' },
              { value: 0, label: '未审核' },
              { value: 1, label: '审核通过' },
              { value: 2, label: '审核不通过' },
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="handleQueryDebounce"
          >搜索
        </el-button>
        <el-button size="default" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!--    增删改操作-->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          size="default"
          @click="handleDelete"
          :disabled="multiple"
          >删除
        </el-button>
      </el-col>
    </el-row>

    <!--    表格-->
    <el-table
      v-loading="loading"
      :data="taskCaseList"
      stripe
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="用户" align="center" prop="user_name" />
      <el-table-column label="我发布的任务" align="center" prop="task_id" />
      <el-table-column label="任务内容" align="center" prop="task_content" />
      <el-table-column label="任务视频" align="center" prop="task_video_url">
        <template #default="scope">
          <el-button
            type="text"
            v-if="scope.row.task_video_url && scope.row.task_video_url.length"
            @click="openDetailIdDialog('视频详情', scope.row)"
            >展开视频
          </el-button>
          <el-tag type="warning" v-else>无视频</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否通过" align="center" prop="is_accepted">
        <template #default="scope">
          <el-tag
            :type="
              scope.row.is_accepted
                ? scope.row.is_accepted === 1
                  ? 'success'
                  : 'danger'
                : 'warning'
            "
          >
            {{
              scope.row.is_accepted
                ? scope.row.is_accepted === 1
                  ? "通过"
                  : "打回"
                : "待审核"
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="提交日期"
        align="center"
        prop="publish_date"
        show-overflow-tooltip
        width="180"
      >
        <template #default="scope">
          <span style="white-space: nowrap"
            >{{
              moment(scope.row.publish_date).format(
                "YYYY年MM月DD日 HH时mm分ss秒"
              )
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="修改日期"
        align="center"
        prop="update_date"
        show-overflow-tooltip
        width="180"
      >
        <template #default="scope">
          <span v-if="scope.row.update_date" style="white-space: nowrap"
            >{{
              moment(scope.row.update_date).format(
                "YYYY年MM月DD日 HH时mm分ss秒"
              )
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            v-if="!scope.row.is_accepted"
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >
            审核
          </el-button>
          <el-tag type="primary" v-else>无任何操作</el-tag>
        </template>
      </el-table-column>
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

    <!-- 审核任务对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form :model="curState" :rules="rules" label-width="80px">
        <el-form-item label="审核状态" prop="is_accepted">
          <el-select
            v-model="curState.is_accepted"
            placeholder="请选择审核的状态"
            size="large"
            default-first-option
            style="width: 240px"
          >
            <el-option
              v-for="item in [
                { value: 0, label: '审核中' },
                { value: 1, label: '审核通过' },
                { value: 2, label: '审核打回' },
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitFormDebounce"
            >确 定
          </el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
    <!--    展示视频信息对话框-->
    <el-dialog v-model="isOpenVideoDetail" draggable append-to-body>
      <el-descriptions
        :title="'视频'"
        direction="vertical"
        :column="1"
        :size="'small'"
        border
      >
        <el-descriptions-item label="视频">
          <my-video
            :src="curVideoURL"
            :title="videoUser"
            style="margin-left: 10vw"
          />
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <!--    展示视频详情的对话框-->
    <el-dialog v-model="isOpenURLsDetail" draggable append-to-body>
      <el-descriptions
        :title="detailTitle"
        :extra="`点击编号可以展示${detailTitle}信息`"
        direction="vertical"
        :column="4"
        :size="'default'"
        border
      >
        <el-descriptions-item :label="`${detailTitle}`">
          <span v-for="(item, i) in curVideoURLList" :key="i">
            <el-tag
              type="primary"
              style="cursor: pointer"
              @click="openDetailInfo(i)"
              round
              effect="plain"
              :hit="true"
              ><text style="text-decoration: underline">{{ item }}</text>
            </el-tag>
          </span>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import { InfoFilled } from "@element-plus/icons-vue";
import {
  DeleteRequest,
  LearningMaterialsControllerService,
  RulesControllerService,
  TasksCaseVO,
  TasksControllerService,
  UserControllerService,
} from "../../../generated";
import { ElMessage, ElNotification, ElPagination } from "element-plus";
import { TasksExamineControllerService } from "../../../generated/services/TasksExamineControllerService";
import moment from "moment/moment";
import { TaskCaseControllerService } from "../../../generated/services/TaskCaseControllerService";
import MyVideo from "@/components/video/MyVideo.vue";

//总数
const total = ref(0);
//是否加载
const loading = ref(true);
// 删除按钮禁用
const multiple = ref(true);
//显示搜索条件
const showSearch = ref(true);
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  id: "",
  is_accepted: "",
  publish_date: "",
  sortField: "",
  sortOrder: "",
  task_content: "",
  task_id: "",
  task_video_url: "",
  update_date: "",
  user_name: "",
});
//查询后得到的数据
const taskCaseList = ref([]);

//选中数组
const ids = ref<DeleteRequest[]>([]);
// 弹出层标题
const title = ref("");
//是否显示数据弹出层
const open = ref(false);

//表单重置
const reset = () => {
  curState.value = {
    task_id: "",
    is_accepted: 0,
    user_id: "",
  };
};

//分页触发事件
const pageHandleChange = (value: number) => {
  queryParams.value.current = value;
  handleQuery();
};

/**
 * 对话框
 */
//规则
const rules = ref({
  text_content: [
    { required: true, message: "学习内容不能为空", trigger: "blur" },
  ],
});
//审核处理任务
const submitForm = async () => {
  const res = await TasksControllerService.confirmCompleteTaskUsingGet({
    task_id: curState.value.task_id as any,
    is_accepted: curState.value.is_accepted,
    user_id: curState.value.user_id as any,
  });
  if (res.code === 0) {
    ElNotification.success("已审核");
    await handleQuery();
  } else ElNotification.error("审核失败，" + res.message);
  open.value = false;
  reset();
};
const submitFormDebounce = debounce(submitForm, 300); //防抖
//取消
const cancel = () => {
  open.value = false;
  reset();
};

//查询数据
const handleQuery = async () => {
  loading.value = true;
  const res = await TaskCaseControllerService.listTasksCaseVoByPageUsingPost({
    pageSize: queryParams.value.pageSize,
    current: queryParams.value.current,
    is_accepted: queryParams.value.is_accepted as any,
    task_content: queryParams.value.task_content,
    user_name: queryParams.value.user_name,
  });
  loading.value = false;

  if (res.code === 0) {
    taskCaseList.value = res.data.records;
    total.value = res.data.total;
  } else ElMessage.error("加载失败，" + res.message);
};
const handleQueryDebounce = debounce(handleQuery, 500);
onMounted(() => {
  handleQuery();
});
//重置
const resetQuery = () => {
  queryParams.value = {
    pageSize: 50,
    current: 1,
    id: "",
    is_accepted: "",
    publish_date: "",
    sortField: "",
    sortOrder: "",
    task_content: "",
    task_id: "",
    task_video_url: "",
    update_date: "",
    user_name: "",
  };
  handleQueryDebounce();
};

/**
 * 表格中的按钮
 */
const curState = ref({
  task_id: "",
  is_accepted: 0,
  user_id: "",
});
//审核
const handleEdit = (index: number, row: any) => {
  curState.value.task_id = row.task_id;
  curState.value.is_accepted = row.is_accepted;
  curState.value.user_id = row.user_id;
  open.value = true;
  title.value = "审核";
};
watch(
  () => ids.value.length,
  () => {
    if (ids.value.length) multiple.value = false;
    else multiple.value = true;
  }
);

const handleSelectionChange = (selection: any) => {
  //拿到选中的行的传递的数组信息selection，将数组selection中的material_id传给ids
  ids.value = [];
  for (let i = 0; i < selection.length; ++i)
    ids.value.push({
      id: selection[i].id,
    });
};
//删除多条记录
const handleDelete = async () => {
  for (let i = 0; i < ids.value.length; ++i) {
    const res = await TaskCaseControllerService.deleteTasksCaseUsingPost({
      id: ids.value[i].id,
    });
    if (res.code === 0) {
      ElNotification.success("删除成功");
    } else ElNotification.error("删除失败，" + res.message);
  }
  await handleQuery();
};

/**
 * 展示视频路径详情
 */
const detailTitle = ref("");
const isOpenURLsDetail = ref(false); //是否打开id详情对话框
const videoUser = ref("");
const curVideoURLList = ref([]);
const curVideoURL = ref("");
//打开详情id对话框
const openDetailIdDialog = (name: string, taskCase: TasksCaseVO) => {
  detailTitle.value = name;
  videoUser.value = taskCase.user_name as any;
  curVideoURLList.value = taskCase.task_video_url as any;
  isOpenURLsDetail.value = true;
};
//打开详情信息对话框
const openDetailInfo = (i: number) => {
  //展示视频列表curDetailIdList中第i个视频
  curVideoURL.value = curVideoURLList.value[i];
  isOpenVideoDetail.value = true;
};

/**
 * 展示视频信息
 */
//是否显示视频详情对话框
const isOpenVideoDetail = ref(false);
</script>

<style scoped>
#TaskExamineView {
}
</style>

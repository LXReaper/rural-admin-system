<template>
  <div id="AnnouncementsView">
    <div class="searchBar">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        v-show="showSearch"
        label-width="68px"
      >
        <el-form-item label="公告标题" prop="title">
          <el-input
            v-model="queryParams.title"
            placeholder="请输入公告标题"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="公告类型" prop="announcement_type">
          <el-select
            v-model="queryParams.announcement_type"
            placeholder="请选择公告类型"
            size="default"
            style="width: 240px"
            @change="handleQueryDebounce"
          >
            <el-option
              v-for="item in ANNOUNCEMENT_TYPE"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示" prop="is_show">
          <el-select
            v-model="queryParams.is_show"
            placeholder="是否显示"
            size="default"
            style="width: 240px"
            @change="handleQueryDebounce"
          >
            <el-option
              v-for="item in [
                {
                  value: 0,
                  label: '隐藏',
                },
                {
                  value: 1,
                  label: '显示',
                },
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            v-model="queryParams.content"
            placeholder="请输入公告内容"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="发布用户" prop="user_name">
          <el-input
            v-model="queryParams.user_name"
            placeholder="请输入发布用户名"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item label="更新用户" prop="updated_user_name">
          <el-input
            v-model="queryParams.updated_user_name"
            placeholder="请输入更新用户名"
            clearable
            @keydown.enter="handleQueryDebounce"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="handleQueryDebounce"
            >搜索
          </el-button>
          <el-button size="default" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="mainView">
      <!--    表格-->
      <el-table
        size="small"
        v-loading="loading"
        :data="announcementsList"
        :header-cell-style="{
          backgroundColor: '#E5EEFF',
          color: '#333',
          height: '5vh',
        }"
        stripe
      >
        <el-table-column
          label="公告编号"
          align="center"
          prop="announcement_id"
        />
        <el-table-column label="公告标题" align="center" prop="title" />
        <el-table-column
          label="公告位置"
          align="center"
          prop="announcement_type"
        >
          <template #default="scope">
            <el-select
              v-model="scope.row.announcement_type"
              placeholder="请选择公告类型"
              size="default"
              @change="editType(scope.row)"
            >
              <el-option
                v-for="item in ANNOUNCEMENT_TYPE"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="公告内容" align="center" prop="content">
          <template #default="scope">
            <el-button
              type="text"
              @click="
                openContentDialog(
                  scope.row.content,
                  scope.row.announcement_type
                )
              "
              >详情
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="公告图片" align="center" prop="image_url">
          <template #default="scope">
            <el-image
              v-if="scope.row.image_url"
              :src="scope.row.image_url"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="公告标题" align="center" prop="title" />
        <el-table-column label="是否展示" align="center" prop="is_show">
          <template #default="scope">
            <el-switch
              :model-value="scope.row.is_show === 1"
              inline-prompt
              active-text="显示"
              inactive-text="隐藏"
              @change="
              (val: boolean) => {
                announcementsList[scope.$index].is_show = val ? 1 : 0;
                handleEdit(scope.$index, scope.row, 'one');
              }
            "
            />
          </template>
        </el-table-column>
        <el-table-column label="发布用户" align="center" prop="user_name" />
        <el-table-column
          label="更新用户"
          align="center"
          prop="updated_user_name"
        />
        <el-table-column
          label="发布时间"
          align="center"
          prop="publish_date"
          width="180"
        >
          <template #default="scope">
            <span>{{ scope.row.publish_date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="update_date"
          width="180"
        >
          <template #default="scope">
            <span>{{ scope.row.update_date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.$index, scope.row, 'all')"
            >
              编辑
            </el-button>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="确定删除这条公告"
              @confirm="confirmEvent(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
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
      <!--    公告内容对话框-->
      <el-dialog
        :title="'公告内容'"
        v-model="openContent"
        style="height: 60vh"
        append-to-body
        destroy-on-close
      >
        <div v-if="curType === ANNOUNCEMENT_TYPE[2].value">
          {{ curContent }}
        </div>
        <my-view
          :value-html="curContent"
          :height="'50vh'"
          :width="'100vw'"
          v-else
        />
      </el-dialog>
      <!--修改公告配置对话框 -->
      <el-dialog
        :title="`编辑${form.title}`"
        v-model="open"
        width="600px"
        append-to-body
        destroy-on-close
        :fullscreen="true"
      >
        <el-form :model="form" :rules="rules" label-width="80px">
          <el-form-item label="公告标题" prop="title">
            <el-input
              v-model="form.title"
              placeholder="请输入公告标题"
              maxlength="50"
              style="width: 60vw"
            />
          </el-form-item>
          <el-form-item label="公告内容" prop="content">
            <el-input
              type="textarea"
              v-model="form.content"
              placeholder="请输入公告内容"
              v-if="form.announcement_type === ANNOUNCEMENT_TYPE[2].value"
            />
            <el-row v-else>
              <el-col :span="15">
                <my-editor
                  :max-length="5000"
                  :width="'50vw'"
                  :height="'57.5vh'"
                  :placeholder="'请输入公告内容'"
                  :value-html="form.content"
                  :handle-change-text="(text) => (textContent = text)"
                  :handleChangeHtml="(v) => (form.content = v)"
                />
              </el-col>
              <el-col style="margin-left: 1vw" :span="3">
                <div
                  style="
                    width: 20vw;
                    height: 64vh;
                    border: 1px solid #dadada;
                    padding: 1vh 1vw;
                    border-radius: 2vw;
                  "
                >
                  <h4 class="Title">预览</h4>
                  <el-scrollbar style="height: 62vh">
                    <div
                      style="overflow-wrap: break-word"
                      v-html="form.content"
                    />
                  </el-scrollbar>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="公告类型" prop="announcement_type">
            <div style="white-space: pre-wrap">
              <el-select
                v-model="form.announcement_type"
                placeholder="请选择公告类型"
                size="default"
                style="width: 60vw"
                @change="changeAnnouncementType"
              >
                <el-option
                  v-for="item in ANNOUNCEMENT_TYPE"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <div class="tips-info">
                注意如果将公告类型为非消息公告改成消息公告，则原来公告内容的格式会被清除！！！
              </div>
            </div>
          </el-form-item>
          <el-form-item label="公告图片" prop="image_url">
            <el-image
              style="width: 10vw; height: 20vh"
              :src="form.image_url"
              v-if="form.image_url"
            ></el-image>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="updateEditor">保 存</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
  <footer-layout />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { debounce } from "../../../utils/debounce_Throttle";
import { ElMessage, ElNotification, ElPagination } from "element-plus";
import { AnnouncementsControllerService } from "../../../generated";
import { ANNOUNCEMENT_TYPE } from "@/defaultData/DefaultData";
import { AnnouncementsVO } from "../../../generated/models/AnnouncementsVO";
import store from "@/store";
import { InfoFilled } from "@element-plus/icons-vue";
import MyView from "@/components/wangEditor/myView.vue";
import MyEditor from "@/components/wangEditor/myEditor.vue";
import FooterLayout from "@/layout/footerLayout.vue";

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
  title: "",
  announcement_type: "",
  content: "",
  updated_user_name: "",
  user_name: "",
  is_show: "",
});
//查询得到的数据
const announcementsList = ref([]);

//查询数据
const handleQuery = async () => {
  loading.value = true;
  const res =
    await AnnouncementsControllerService.listAnnouncementsVoByPageUsingPost({
      pageSize: queryParams.value.pageSize,
      current: queryParams.value.current,
      title: queryParams.value.title,
      announcement_type: queryParams.value.announcement_type,
      content: queryParams.value.content,
      updated_user_name: queryParams.value.updated_user_name,
      user_name: queryParams.value.user_name,
      is_show: queryParams.value.is_show as any,
    });
  loading.value = false;
  if (res.code === 0) {
    announcementsList.value = res.data.records;
    total.value = res.data.total;
  } else ElMessage.error("公告信息加载失败，" + res.message);
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
    title: "",
    announcement_type: "",
    content: "",
    updated_user_name: "",
    user_name: "",
    is_show: "",
  };
  handleQueryDebounce();
};
//分页触发事件
const pageHandleChange = (value: number) => {
  queryParams.value.current = value;
  handleQuery();
};

/**
 * websocket接收消息
 */
const wxSocket = ref(
  store.state.websocketMessageData.websocketMessage.noticeSocket
);
wxSocket.value.onmessage = function (message: any) {
  const meg = message.data;
  const notice = JSON.parse(meg);
  //是公告通知就加载表格数据
  if (notice.announcement_type) handleQuery();
};

/**
 * 编辑
 */
//公告内容的Text文本
const textContent = ref();
//打开编辑
const open = ref(false);
//公告表单
const form = ref({
  announcement_id: "",
  announcement_type: "",
  content: "",
  image_url: "",
  title: "",
  is_show: 0,
});
const resetForm = () => {
  form.value = {
    announcement_id: "",
    announcement_type: "",
    content: "",
    image_url: "",
    title: "",
    is_show: 0,
  };
};
//编辑公告类型
const editType = (announcementsVO: AnnouncementsVO) => {
  resetForm();
  form.value.announcement_id = announcementsVO.announcement_id as any;
  form.value.title = announcementsVO.title as any;
  form.value.announcement_type = announcementsVO.announcement_type as any;
  form.value.content = announcementsVO.content as any;
  form.value.image_url = announcementsVO.image_url as any;
  updateEditor();
};
//更新公告
const updateEditor = async () => {
  const res = await AnnouncementsControllerService.updateAnnouncementsUsingPost(
    {
      announcement_id: form.value.announcement_id as any,
      announcement_type: form.value.announcement_type,
      content: form.value.content,
      image_url: form.value.image_url,
      title: form.value.title,
      is_show: form.value.is_show,
    }
  );
  if (res.code === 0) {
    ElMessage.success("修改成功");
    await handleQuery().then((r) => (open.value = false));
  } else ElMessage.error("修改失败，" + res.message);
};
//编辑,type：all表示编辑所有，one表示编辑一个
const handleEdit = (
  i: number,
  announcementsVO: AnnouncementsVO,
  type: string
) => {
  form.value.announcement_id = announcementsVO.announcement_id as any;
  form.value.title = announcementsVO.title as any;
  form.value.announcement_type = announcementsVO.announcement_type as any;
  form.value.content = announcementsVO.content as any;
  form.value.image_url = announcementsVO.image_url as any;
  form.value.is_show = announcementsVO.is_show as any;
  if (type === "all") open.value = true;
  if (type !== "all") updateEditor();
};

/**
 * 编辑对话框
 * @param i
 * @param announcementsVO
 */
//关闭对话框
const cancel = () => {
  resetForm();
  open.value = false;
};
//选择公告类型
const changeAnnouncementType = () => {
  //消息公告,则设置为非html文本
  if (form.value.announcement_type === ANNOUNCEMENT_TYPE[2].value)
    form.value.content = textContent.value;
};
//规则
const rules = ref({
  title: [{ required: true, message: "输入公告标题", trigger: "blur" }],
  content: [{ required: true, message: "输入公告内容", trigger: "blur" }],
  announcement_type: [
    { required: true, message: "输入公告类型", trigger: "blur" },
  ],
});

//删除公告
const confirmEvent = async (i: number, announcementsVO: AnnouncementsVO) => {
  const res = await AnnouncementsControllerService.deleteAnnouncementsUsingPost(
    {
      id: announcementsVO.announcement_id,
    }
  );
  if (res.code === 0) {
    await handleQuery();
  } else ElMessage.error("删除公告失败，" + res.message);
};
/**
 * 公告内容对话框
 */
//打开公告内容
const openContent = ref(false);
//当前显示的公告信息
const curContent = ref();
//当前的公告类型
const curType = ref();
//打开内容对话框
const openContentDialog = (content: string, type: string) => {
  openContent.value = true;
  curContent.value = content;
  curType.value = type;
};
</script>

<style scoped>
#AnnouncementsView {
  background-color: #f0f2f5;
  padding: 1vh 1vw;
}

/*搜索栏*/
.searchBar {
  background-color: white;
  padding: 2vh 1vw 0 5vw;
  margin-bottom: 2vh;
}

/*主要内容窗口*/
.mainView {
  background-color: white;
  padding: 2vh 1.5vw 0 1.5vw;
  margin-bottom: 2vh;
}

/*公告内容预览标题*/
.Title {
  user-select: none;
  height: 0;
  margin: 1px auto 30px auto;
  text-align: center;
  color: #707070;
}

/*提示信息*/
.tips-info {
  line-height: 18px;
  margin-top: 3px;
  color: #c0c4cc;
  font-size: 12px;
}
</style>

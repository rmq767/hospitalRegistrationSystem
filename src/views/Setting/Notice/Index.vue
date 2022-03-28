<template>
  <div>
    <el-card class="mb20">
      <el-form
        :model="filterForm"
        label-width="100px"
        :inline="true"
        ref="ruleFormRef"
      >
        <el-form-item label="公告标题：" prop="title">
          <el-input v-model="filterForm.title" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
          <el-button @click="onReset(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="mb20">
        <el-button type="primary" @click="addNotice">新增公告</el-button>
      </div>
      <el-table :data="noticeTable">
        <el-table-column
          v-for="col in tableColumns"
          :prop="col.prop"
          :key="col.prop"
          :label="col.label"
        >
          <template #default="scope" v-if="col.prop === 'creatTime'">
            <span>{{ formatDate(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="editNotice(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleteNotice(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :currentPage="pageInfo.currentPage"
        :pageSize="pageInfo.pageSize"
        :total="pageInfo.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></Pagination>
    </el-card>
    <Dialog
      :info="noticeInfo"
      ref="noticeDialogEl"
      @submitForm="submitForm"
    ></Dialog>
  </div>
</template>

<script lang="ts">
import api from "@/api";
import { Session } from "@/utils/session";
import { ElDialog, ElMessage, ElMessageBox, FormInstance } from "element-plus";
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import Dialog from "./components/NoticeDialog.vue";
import mixin from "@/mixin";
interface notice {
  title: string;
  content: string;
}
export default defineComponent({
  name: "SettingDepartment",
  components: {
    Dialog,
  },
  mixins: [mixin],
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const state = reactive({
      filterForm: {
        title: "",
        content: "",
      } as notice,
      noticeTable: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableColumns: [
        {
          prop: "title",
          label: "公告标题",
        },
        {
          prop: "content",
          label: "公告内容",
        },
        {
          prop: "adminId",
          label: "创建人",
        },
        {
          prop: "creatTime",
          label: "创建时间",
        },
      ],
      noticeInfo: null,
      noticeDialogEl: ElDialog,
    });
    /**
     * @description 获取adminID
     */
    const adminID = computed(() => {
      return Session.get("userInfo").username;
    });
    /**
     * @description 获取公告
     */
    const getNoticeList = async () => {
      try {
        const params = {
          currentPage: state.pageInfo.currentPage,
          pageSize: state.pageInfo.pageSize,
          title: state.filterForm.title,
        };
        const response = await api.notice.apiGetAnnouncementList(params);
        if (response.data.code === 200) {
          state.noticeTable = response.data.data.records;
          state.pageInfo.total = response.data.data.total;
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    /**
     * @description 条件筛选
     */
    const onSubmit = () => {
      getNoticeList();
    };
    /**
     * @description 重置
     */
    const onReset = (formEl: FormInstance | undefined) => {
      console.log(formEl);
      if (!formEl) return;
      formEl.resetFields();
      getNoticeList();
    };
    /**
     * @description 新增或者编辑公告
     */
    const submitForm = async (data: any) => {
      let { isEdit, form } = data;
      form.adminId = adminID;
      if (isEdit) {
        editNoticeForm(form);
      } else {
        addNoticeForm(form);
      }
    };
    /**
     * @description 新增公告
     */
    const addNoticeForm = async (form: notice) => {
      try {
        const response = await api.notice.apiAddAnnouncement(form);
        if (response.data.code === 200) {
          ElMessage.success("新增成功！");
          getNoticeList();
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    /**
     * @description 修改公告
     */
    const editNoticeForm = async (form: notice) => {
      try {
        const response = await api.notice.apiEditAnnouncement(form);
        if (response.data.code === 200) {
          ElMessage.success("修改成功！");
          getNoticeList();
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    const addNotice = () => {
      state.noticeInfo = null;
      state.noticeDialogEl.open();
    };
    const editNotice = (row: any) => {
      nextTick(() => {
        state.noticeInfo = Object.assign({}, row);
      });
      state.noticeDialogEl.open();
    };
    /**
     * @description 删除公告
     */
    const deleteNotice = (row: any) => {
      ElMessageBox.confirm("确定删除?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await api.notice.apiDeleteAnnouncement(row.id);
            if (response.data.code === 200) {
              ElMessage.success("删除成功！");
              getNoticeList();
            } else {
              ElMessage.error(response.data.msg);
            }
          } catch (error: any) {
            ElMessage.error(error);
          }
        })
        .catch(() => {});
    };
    const handleCurrentChange = (page: number) => {
      state.pageInfo.currentPage = page;
      getNoticeList();
    };
    const handleSizeChange = (pageSize: number) => {
      state.pageInfo.pageSize = pageSize;
      state.pageInfo.currentPage = 1;
      getNoticeList();
    };
    onMounted(() => {
      getNoticeList();
    });
    return {
      ...toRefs(state),
      onSubmit,
      addNotice,
      editNotice,
      deleteNotice,
      handleCurrentChange,
      handleSizeChange,
      ruleFormRef,
      submitForm,
      onReset,
    };
  },
});
</script>

<style lang="scss" scoped></style>

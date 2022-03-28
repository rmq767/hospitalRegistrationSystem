<template>
  <div>
    <el-card class="mb20">
      <el-form
        :model="filterForm"
        label-width="100px"
        :inline="true"
        ref="ruleFormRef"
      >
        <el-form-item label="科室名称：" prop="id">
          <el-select v-model="filterForm.id" clearable filterable>
            <el-option
              v-for="item in departmentOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
          <el-button @click="onReset(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="mb20">
        <el-button type="primary" @click="addDepartment">新增科室</el-button>
      </div>
      <el-table :data="departmentTable">
        <el-table-column
          v-for="col in tableColumns"
          :prop="col.prop"
          :key="col.prop"
          :label="col.label"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="editDepartment(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="deleteDepartment(scope.row)"
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
      :info="departmentInfo"
      ref="departmentDialogEl"
      @submitForm="submitForm"
    ></Dialog>
  </div>
</template>

<script lang="ts">
import api from "@/api";
import { ElDialog, ElMessage, ElMessageBox, FormInstance } from "element-plus";
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import Dialog from "./components/DepartmentDialog.vue";
export default defineComponent({
  name: "SettingDepartment",
  components: {
    Dialog,
  },
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const state = reactive({
      filterForm: {
        id: "",
      },
      departmentOptions: [],
      departmentTable: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableColumns: [
        {
          prop: "name",
          label: "科室名称",
        },
        {
          prop: "number",
          label: "科室编号",
        },
        {
          prop: "location",
          label: "位置",
        },
        {
          prop: "introduction",
          label: "简介",
        },
      ],
      departmentInfo: null,
      departmentDialogEl: ElDialog,
      departmentId: "",
    });
    /**
     * @description 分页获取科室
     */
    const getDepartmentList = async () => {
      const params = {
        ...state.filterForm,
        ...state.pageInfo,
      };
      try {
        const response = await api.department.apiGetAdministrativeList(params);
        if (response.data.code === 200) {
          state.departmentTable = response.data.data.records;
          state.pageInfo.total = response.data.data.total;
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    /**
     * @description 获取科室下拉
     */
    const getAllDepartment = async () => {
      try {
        const response = await api.department.apiGetAllAdministrative();
        if (response.data.code === 200) {
          state.departmentOptions = response.data.data;
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    /**
     * @description 筛选
     */
    const onSubmit = () => {
      getDepartmentList();
    };
    /**
     * @description 重置
     */
    const onReset = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
      getDepartmentList();
    };
    /**
     * @description 新增或者编辑
     */
    const submitForm = (data: any) => {
      if (data.isEdit) {
        editDepartmentApi(data.form);
      } else {
        addDepartmentApi(data.form);
      }
    };
    /**
     * @description 新增科室
     */
    const addDepartmentApi = async (form: any) => {
      try {
        const response = await api.department.apiAddAdministrative(form);
        if (response.data.code === 200) {
          ElMessage.success("新增成功！");
          getDepartmentList();
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    /**
     * @description 编辑科室
     */
    const editDepartmentApi = async (form: any) => {
      try {
        const response = await api.department.apiEditAdministrative(form);
        if (response.data.code === 200) {
          ElMessage.success("编辑成功！");
          getDepartmentList();
        } else {
          ElMessage.error(response.data.msg);
        }
      } catch (error: any) {
        ElMessage.error(error);
      }
    };
    const addDepartment = () => {
      state.departmentInfo = null;
      state.departmentDialogEl.open();
    };
    const editDepartment = (row: any) => {
      state.departmentId = row.id;
      nextTick(() => {
        state.departmentInfo = Object.assign({}, row);
      });
      state.departmentDialogEl.open();
    };
    const deleteDepartment = (row: any) => {
      ElMessageBox.confirm("确定删除?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const params = {
            administrativeId: row.id,
          };
          try {
            const response = await api.department.apiDeleteAdministrative(
              params
            );
            if (response.data.code === 200) {
              ElMessage.success("删除成功！");
              getDepartmentList();
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
      getDepartmentList();
    };
    const handleSizeChange = (pageSize: number) => {
      state.pageInfo.pageSize = pageSize;
      state.pageInfo.currentPage = 1;
      getDepartmentList();
    };
    onMounted(() => {
      getAllDepartment();
      getDepartmentList();
    });
    return {
      ...toRefs(state),
      onSubmit,
      addDepartment,
      editDepartment,
      deleteDepartment,
      handleCurrentChange,
      handleSizeChange,
      ruleFormRef,
      onReset,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped></style>

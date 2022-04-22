<template>
  <el-aside width="200px">
    <el-scrollbar :style="{ maxHeight: `calc(100vh - 60px)` }">
      <el-menu
        router
        :mode="mode"
        :default-active="defaultActive"
        background-color="transparent"
      >
        <template v-for="val in menuList" >
          <el-sub-menu
            :index="val.path"
            v-if="val.children && val.children.length > 0"
            :key="val.path"
            class="metatitles"
          >
            <template #title>
              <!-- <SvgIcon :name="val.meta.icon" /> -->
              <span class="metaone1">{{ val.meta.title }}</span>
            </template>
            <SubItem :chil="val.children" />
          </el-sub-menu>
          <el-menu-item :index="val.path" :key="val.path" v-else>
            <!-- <SvgIcon :name="val.meta.icon" /> -->
            <template #title>
              <span class="metaone2">{{ val.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRefs, watch } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import SubItem from "./subMenu.vue";

export default defineComponent({
  name: "Aside",
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
    SubItem,
  },
  props: {
    mode: {
      type: String,
      default: "vertical",
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const state: any = reactive({
      menuList: [],
      defaultActive: route.path,
      isCollapse: false,
    });
    // 设置/过滤路由（非静态路由/是否显示在菜单中）
    const setFilterRoutes = () => {
      state.menuList = filterRoutesFun(store.state.routesList);
    };
    // 路由过滤递归函数
    const filterRoutesFun = (arr: Array<object>) => {
      return arr
        .filter((item: any) => !item.meta.isHide)
        .map((item: any) => {
          item = Object.assign({}, item);
          if (item.children) item.children = filterRoutesFun(item.children);
          return item;
        });
    };
    /**
     * @description 监听路由变化，切换菜单选中
     */
    watch(
      () => route.path,
      () => {
        state.defaultActive = route.path;
      }
    );
    /**
     * @description 加载前设置路由菜单
     */
    onBeforeMount(() => {
      setFilterRoutes();
    });
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: var(--el-color-white);
  box-shadow: var(--box-shadow);
  .el-menu {
    border-right: 0;
    background-color: var(--el-color-white);
  }
}

.metatitles{
  
  // background: #263939;
  color: rgb(248, 246, 246);
}
.metaone1 .metaone2{
      font-size: 120%;
  // color: rgba(254,254,254,.65);
}
</style>

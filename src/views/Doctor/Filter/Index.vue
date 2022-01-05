<template>
  <div class="doctor">
    <DoctorFilter></DoctorFilter>
    <DoctorList></DoctorList>
    <Pagination></Pagination>
  </div>
</template>

<script lang="ts">
import Pagination from "@/components/Pagination.vue";
import { defineComponent } from "vue";
import DoctorFilter from "./components/DoctorFilter.vue";
import DoctorList from "./components/DoctorList.vue";
export default defineComponent({
  name: "Doctor",
  components: {
    DoctorFilter,
    DoctorList,
    Pagination,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>

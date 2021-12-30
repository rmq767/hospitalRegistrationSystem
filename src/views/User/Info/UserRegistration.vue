<template>
  <div>
    <UserRegistrationInfo :info="state" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import UserRegistrationInfo from "./components/UserRegistrationInfo.vue";
export default defineComponent({
  name: "UserRegistration",
  components: {
    UserRegistrationInfo,
  },
  setup() {
    const state = reactive({
      date: "2021-12-29 上午",
      department: "儿科",
      doctor: "李主任",
      name: "小阮",
      phone: "15281223440",
      id: "123",
    });
    return { state };
  },
});
</script>

<style lang="scss" scoped></style>

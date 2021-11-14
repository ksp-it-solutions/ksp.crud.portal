<template>
  <div>
    <br />
    <h2 class="kps-title-form">
      Update:
      <span class="ksp-title-form-identification">{{
        recordEmploy.employ.fullName
      }}</span>
    </h2>
    <div class="alert alert-danger" v-if="errorResponse.message">
      {{ errorResponse.message }}
      <br />
    </div>
    <hr />
    <br />
    <div class="container">
      <EmployeesForm
        :selectedSystemUser="recordEmploy"
        :selectedEmploy="recordEmploy.employ"
        :isCreation="false"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import EmployeesForm from "../../components/Employees/EmployeesForm.vue";
import router from "../../router/index";

export default {
  name: "EmployeesCreate",
  components: {
    EmployeesForm,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["errorResponse", "recordEmploy"]),
  },
  methods: {
    ...mapActions(["getEmploy"]),
  },
  async created() {
    if (this.$route.params.id.length !== 36) {
      router.push("/page-not-found");
      return;
    }
    await this.getEmploy(this.$route.params.id);
    if (this.recordEmploy.employId === "00000000-0000-0000-0000-000000000000") {
      router.push("/page-not-found");
      return;
    }
  },
};
</script>

<style>
.row {
  margin-bottom: 30px;
}

.form-group label {
  margin-bottom: 12px;
}
</style>
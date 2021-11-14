<template>
  <div>
    <br />
    <h2 class="kps-title-form">Create employ record</h2>
    <div class="alert alert-danger" v-if="errorResponse.message">
      {{ errorResponse.message }}
      <br />
    </div>
    <hr />
    <br />
    <div class="container">
      <EmployeesForm
        :selectedEmploy="employ"
        :selectedSystemUser="systemuser"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EmployeesForm from "../../components/Employees/EmployeesForm.vue";
import SystemUsers from "../../models/SystemUsers";
import Employees from "../../models/Employees";

export default {
  name: "EmployeesCreate",
  components: {
    EmployeesForm,
  },
  data() {
    return {
      systemuser: new SystemUsers(),
      employ: new Employees(),
    };
  },
  computed: {
    ...mapState(["errorResponse"]),
  },
  methods: {},
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
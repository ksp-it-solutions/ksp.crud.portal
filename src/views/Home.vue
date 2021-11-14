<template>
  <div>
    <br />
    <h2 style="margin-bottom: 15px">Employees records</h2>
    <div class="row">
      <div class="col-md-12" style="text-align: left">
        <router-link to="/employees/create">
          Create new employ record
        </router-link>
        <br />
        <br />
        <a class="action" @click="downloadEmployeesFile"> Donwload list </a>
      </div>
    </div>
    <div
      class="alert alert-danger"
      style="margin-top: 20px"
      v-if="errorResponse.message"
    >
      {{ errorResponse.message }}
      <br />
    </div>
    <div
      class="alert alert-success"
      style="margin-top: 20px"
      v-if="successResponse.message"
    >
      {{ successResponse.message }}
      <br />
    </div>
    <hr />
    <br />
    <EmployeesList />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import XLSX from "xlsx";
import EmployeesList from "../components/Employees/EmployeesList";

export default {
  name: "Home",
  components: {
    EmployeesList,
  },
  computed: {
    ...mapState(["successResponse", "errorResponse", "employees"]),
  },
  methods: {
    ...mapActions(["loadLogin", "getEmployees"]),
    downloadEmployeesFile() {
      let docEmployData = new Array();
      this.employees.forEach((element, index) => {
        docEmployData.push({
          "#": index + 1,
          "Full name": element.fullName,
          Name: element.name,
          "First Last name": element.firstLastName,
          "Second Last name": element.secondLastName,
          Job: element.job,
          Salary: `$ ${element.salary}`,
          "Hiring date": element.hiringDate
            ? element.hiringDate.substring(0, 10)
            : "",
        });
      });
      const data = XLSX.utils.json_to_sheet(docEmployData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, "data");
      XLSX.writeFile(wb, "employees.xlsx");
    },
  },
  async created() {
    this.loadLogin();
    await this.getEmployees();
  },
};
</script>

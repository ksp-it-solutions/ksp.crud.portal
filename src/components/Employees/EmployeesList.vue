<template>
  <table class="ksp-table">
    <thead class="">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Full name</th>
        <th scope="col">Job</th>
        <th scope="col">Salary</th>
        <th scope="col">Hiring date</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody class="">
      <tr v-if="employees.length === 0">
        <td colspan="6" class="align-middle">
          <p style="text-align: center; font-size: 18px">
            There are any record to show
          </p>
        </td>
      </tr>
      <tr
        v-for="(item, index) in employees"
        :key="item.employId"
        :class="`${index % 2 == 0 ? 'active-row' : ''}`"
      >
        <td class="align-middle">
          <p>
            <strong>{{ index + 1 }}</strong>
          </p>
        </td>
        <td class="align-middle">
          <router-link
            style="text-decoration: none; font-weight: normal"
            :to="{
              name: 'employees_update',
              params: {
                id: item.employId,
              },
            }"
          >
            {{ item.fullName }}
          </router-link>
        </td>
        <td class="align-middle">
          <p>{{ item.job }}</p>
        </td>
        <td class="align-middle">
          <p>$ {{ item.salary }}</p>
        </td>
        <td class="align-middle">
          <p>
            {{
              item.hiringDate
                ? item.hiringDate.substring(0, 10)
                : item.hiringDate
            }}
          </p>
        </td>
        <td class="align-middle">
          <div class="row" style="padding: 0px; margin: 0px">
            <div
              class="col-md-4 center-elements-v"
              style="padding-top: 8px; padding-bottom: 8px"
            >
              <i
                class="fas fa-trash-alt action"
                style="color: #f90303; font-size: 21px"
                @click="deleteEmploy(item.employId)"
              ></i>
            </div>
            <div
              class="col-md-4 center-elements-v"
              style="padding-top: 8px; padding-bottom: 8px"
            >
              <router-link
                class="action"
                :to="{
                  name: 'employees_update',
                  params: { id: item.employId },
                }"
              >
                <i
                  class="fas fa-pencil-alt"
                  style="color: #0a80d5; font-size: 22px"
                ></i>
              </router-link>
            </div>
            <div
              class="col-md-4 center-elements-v"
              style="padding-top: 8px; padding-bottom: 8px"
            >
              <router-link
                class="action"
                :to="{ name: 'beneficiaries', params: { id: item.employId } }"
              >
                <i
                  class="fas fa-users action"
                  style="color: #05bf45; font-size: 25px"
                ></i>
              </router-link>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "EmployeesList",
  computed: {
    ...mapState(["employees", "errorResponse"]),
  },
  methods: {
    ...mapActions(["deleteEmployees"]),
    deleteEmploy(employId) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.deleteEmployees(employId);
          if (this.errorResponse.message !== null) return;
          this.$swal("Deleted!", "Record has been deleted.", "success");
          let body = document.body;
          body.classList.remove("swal2-height-auto");
        }
      });
      let body = document.body;
      body.classList.remove("swal2-height-auto");
    },
  },
};
</script>
<style>
tr > td > p {
  margin: 0px;
  padding: 0px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
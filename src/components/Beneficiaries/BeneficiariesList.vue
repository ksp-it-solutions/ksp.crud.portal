<template>
  <table class="ksp-table">
    <thead class="">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Full name</th>
        <th scope="col">Relationship</th>
        <th scope="col">Gender</th>
        <th scope="col">Date of birth</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody class="">
      <tr v-if="beneficiaries.length === 0">
        <td colspan="6" class="align-middle">
          <p style="text-align: center; font-size: 18px">
            There are any record to show
          </p>
        </td>
      </tr>
      <tr
        v-for="(item, index) in beneficiaries"
        :key="item.beneficiaryId"
        :class="`${index % 2 == 0 ? 'active-row' : ''}`"
      >
        <td class="align-middle">
          <p>
            <strong>{{ index + 1 }}</strong>
          </p>
        </td>
        <td class="align-middle">
          <p class="action" @click="setBeneficiaryRecord(item.beneficiaryId)">
            {{ item.fullName }}
          </p>
        </td>
        <td class="align-middle">
          <p>{{ item.relationship }}</p>
        </td>
        <td class="align-middle">
          <p v-if="item.gender === 1">Sin especificar</p>
          <p v-if="item.gender === 2">Masculino</p>
          <p v-if="item.gender === 3">Femenino</p>
        </td>
        <td class="align-middle">
          <p>
            {{
              item.dateBirth ? item.dateBirth.substring(0, 10) : item.dateBirth
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
                @click="deleteBeneficiary(item.beneficiaryId)"
              ></i>
            </div>
            <div
              class="col-md-4 center-elements-v"
              style="padding-top: 8px; padding-bottom: 8px"
            >
              <i
                class="fas fa-pencil-alt action"
                style="color: #0a80d5; font-size: 22px"
                @click="setBeneficiaryRecord(item.beneficiaryId)"
              ></i>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Beneficiaries from "../../models/Beneficiaries";

export default {
  name: "BeneficiariesList",
  props: {
    setBeneficiaryRecord: { type: Function, default: () => {} },
  },
  computed: {
    ...mapState(["beneficiaries", "errorResponse"]),
  },
  methods: {
    ...mapActions([
      "deleteBeneficiaries",
      "setErrorResponse",
      "setSuccessResponse",
      "setBeneficiary",
    ]),
    deleteBeneficiary(beneficiaryId) {
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
          await this.deleteBeneficiaries(beneficiaryId);
          if (this.errorResponse.message !== null) return;
          this.$swal("Deleted!", "Record has been deleted.", "success");
          let body = document.body;
          body.classList.remove("swal2-height-auto");
          this.setErrorResponse(null);
          this.setSuccessResponse(null);
          this.setBeneficiary(new Beneficiaries());
        }
      });
      let body = document.body;
      body.classList.remove("swal2-height-auto");
    },
  },
};
</script>

<style>
</style>
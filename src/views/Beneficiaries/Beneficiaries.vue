<template>
  <div>
    <br />
    <h2 style="margin-bottom: 15px">Beneficiaries</h2>
    <div class="row">
      <div class="col-md-12" style="text-align: left">
        <a class="action" @click="downloadBeneficiariesFile"> Donwload list </a>
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
    <form class="ksp-form-container">
      <BeneficiariesForm
        :selectedBeneficiaries="beneficiary"
        :cancelBeneficiaryRecord="cancelBeneficiaryRecord"
        :processCreateForm="processCreateForm"
        :processUpdateForm="processUpdateForm"
        :isCreation="
          beneficiary.beneficiaryId !== '00000000-0000-0000-0000-000000000000'
            ? false
            : true
        "
      />
    </form>
    <br />
    <BeneficiariesList :setBeneficiaryRecord="setBeneficiaryRecord" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import XLSX from "xlsx";
import BeneficiariesForm from "../../components/Beneficiaries/BeneficiariesForm.vue";
import BeneficiariesList from "../../components/Beneficiaries/BeneficiariesList.vue";
import Beneficiaries from "../../models/Beneficiaries";

export default {
  name: "Beneficiaries",
  data() {
    return {
      employId: this.$route.params.id,
    };
  },
  components: {
    BeneficiariesForm,
    BeneficiariesList,
  },
  computed: {
    ...mapState([
      "successResponse",
      "errorResponse",
      "beneficiary",
      "beneficiaries",
    ]),
  },
  methods: {
    ...mapActions([
      "loadLogin",
      "getBeneficiaries",
      "setErrorResponse",
      "setSuccessResponse",
      "createBeneficiary",
      "updateBeneficiary",
      "getBeneficiary",
      "setBeneficiary",
    ]),
    downloadBeneficiariesFile() {
      let docBeneficiariesData = new Array();
      this.beneficiaries.forEach((element, index) => {
        let gender = "";
        if (element.gender === 1) gender = "Sin especificar";
        if (element.gender === 2) gender = "Masculino";
        if (element.gender === 3) gender = "Femenino";
        docBeneficiariesData.push({
          "#": index + 1,
          "Full name": element.fullName,
          Name: element.name,
          "First Last name": element.firstLastName,
          "Second Last name": element.secondLastName,
          Relationship: element.relationship,
          Gender: gender,
          "Date of birth": element.dateBirth
            ? element.dateBirth.substring(0, 10)
            : "",
        });
      });
      const data = XLSX.utils.json_to_sheet(docBeneficiariesData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, "data");
      XLSX.writeFile(wb, "beneficiaries.xlsx");
    },
    async setBeneficiaryRecord(beneficiaryId) {
      this.setErrorResponse(null);
      this.setSuccessResponse(null);
      this.setBeneficiary(new Beneficiaries());
      await this.getBeneficiary(beneficiaryId);
      if (this.errorResponse.message !== null) return;
    },
    cancelBeneficiaryRecord() {
      this.setErrorResponse(null);
      this.setSuccessResponse(null);
      this.setBeneficiary(new Beneficiaries());
      return;
    },
    async processCreateForm() {
      this.beneficiary.EmployId(this.employId);
      await this.createBeneficiary(this.beneficiary);
      if (this.errorResponse.message !== null) return;
      this.setBeneficiary(new Beneficiaries());
    },
    async processUpdateForm() {
      await this.updateBeneficiary(this.beneficiary);
      if (this.errorResponse.message !== null) return;
      this.setBeneficiary(new Beneficiaries());
      await this.getBeneficiaries(this.employId);
    },
  },
  async created() {
    await this.loadLogin();
    await this.getBeneficiaries(this.employId);
  },
};
</script>

<style>
</style>
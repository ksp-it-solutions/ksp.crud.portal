<template>
  <div>
    <h5 class="kps-subtitle-form">General information:</h5>
    <div class="row">
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="name" class="ksp-form-label">
            Name: <span class="required">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            class="ksp-form-control"
            placeholder="--"
            autocomplete="true"
            v-model.trim="selectedBeneficiaries.name"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="firstLastName" class="ksp-form-label">
            First last name:
          </label>
          <input
            id="firstLastName"
            name="firstLastName"
            type="text"
            class="ksp-form-control"
            placeholder="--"
            autocomplete="true"
            v-model.trim="selectedBeneficiaries.firstLastName"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="secondLastName" class="ksp-form-label">
            Second last name:
          </label>
          <input
            id="secondLastName"
            name="secondLastName"
            type="text"
            class="ksp-form-control"
            placeholder="--"
            autocomplete="true"
            v-model.trim="selectedBeneficiaries.secondLastName"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="relationship" class="ksp-form-label">
            Relationship: <span class="required">*</span>
          </label>
          <input
            id="relationship"
            name="relationship"
            type="text"
            class="ksp-form-control"
            placeholder="--"
            autocomplete="true"
            v-model.trim="selectedBeneficiaries.relationship"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="gender" class="ksp-form-label">Gender:</label>
          <select
            id="gender"
            name="gender"
            class="ksp-form-control"
            v-model.trim="selectedBeneficiaries.gender"
          >
            <option value="1">Sin especificar</option>
            <option value="2">Masculino</option>
            <option value="3">Femenino</option>
          </select>
        </div>
      </div>
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="dateBirth" class="ksp-form-label">
            Date of birth: <span class="required">*</span>
          </label>
          <input
            id="dateBirth"
            name="dateBirth"
            type="date"
            class="ksp-form-control"
            placeholder="--"
            autocomplete="true"
            v-model.trim="selectedBeneficiaries.dateBirth"
          />
        </div>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-md-3">
        <div class="ksp-container-control">
          <button
            class="ksp-button ksp-button-primary"
            style="width: 100%"
            @click.prevent="
              isCreation ? processCreateForm() : processUpdateForm()
            "
            :disabled="disabled"
          >
            {{ isCreation ? "Create record" : "Update record" }}
          </button>
        </div>
      </div>
      <div class="col-md-3">
        <div class="ksp-container-control">
          <button
            class="ksp-button ksp-button-danger"
            style="width: 100%"
            @click.prevent="cancelBeneficiaryRecord()"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Beneficiaries from "../../models/Beneficiaries";

export default {
  name: "BeneficiariesForm",
  props: {
    selectedBeneficiaries: { type: Object, default: new Beneficiaries() },
    cancelBeneficiaryRecord: { type: Function, default: () => {} },
    processCreateForm: { type: Function, default: () => {} },
    processUpdateForm: { type: Function, default: () => {} },
    isCreation: { type: Boolean, default: true },
  },
  computed: {
    disabled() {
      if (!this.selectedBeneficiaries.dateBirth) return true;
      let birthday = new Date(this.selectedBeneficiaries.dateBirth);
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      if (birthday > today) {
        this.setErrorResponse(
          "The day of birth needs to be less or equal of today!"
        );
        return true;
      }
      this.setErrorResponse(null);
      if (this.selectedBeneficiaries.name.length < 1) return true;
      if (this.selectedBeneficiaries.relationship.length < 1) return true;
      return false;
    },
  },
  methods: {
    ...mapActions(["setErrorResponse", "setSuccessResponse"]),
  },
};
</script>

<style>
</style>
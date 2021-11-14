<template>
  <form
    class="ksp-form-container"
    @submit.prevent="isCreation ? processCreateForm() : processUpdateForm()"
  >
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
            v-model.trim="selectedEmploy.name"
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
            v-model.trim="selectedEmploy.firstLastName"
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
            v-model.trim="selectedEmploy.secondLastName"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="job" class="ksp-form-label">
            Job: <span class="required">*</span>
          </label>
          <input
            id="job"
            name="job"
            type="text"
            class="ksp-form-control"
            placeholder="--"
            autocomplete="true"
            v-model.trim="selectedEmploy.job"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="salary" class="ksp-form-label"> Salary: </label>
          <input
            id="salary"
            name="salary"
            type="number"
            class="ksp-form-control"
            placeholder="--"
            autocomplete="true"
            v-model.trim="selectedEmploy.salary"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="hiringDate" class="ksp-form-label">
            Hiring date: <span class="required">*</span>
          </label>
          <input
            id="hiringDate"
            name="hiringDate"
            type="date"
            class="ksp-form-control"
            placeholder="--"
            autocomplete="true"
            :disabled="
              selectedEmploy.employId === '00000000-0000-0000-0000-000000000000'
                ? false
                : true
            "
            v-model.trim="selectedEmploy.hiringDate"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="photo" class="ksp-form-label">
            Photo: <span class="required">*</span>
          </label>
          <input
            id="photo"
            name="photo"
            class="ksp-form-control"
            type="file"
            accept="image/*"
            @change="onFileChange"
            v-if="!selectedEmploy.photo"
          />
          <div v-else>
            <img
              :src="selectedEmploy.photo"
              style="width: 100%; margin-bottom: 10px; margin-top: 10px"
            />
            <button
              class="ksp-button ksp-button-info"
              style="width: 100%"
              @click="removeImage"
            >
              Remove image
            </button>
          </div>
        </div>
      </div>
    </div>
    <h5 class="kps-subtitle-form">System user information:</h5>
    <div class="row">
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="username" class="ksp-form-label">
            Username: <span class="required">*</span>
          </label>
          <input
            id="username"
            name="username"
            type="email"
            class="ksp-form-control"
            placeholder="--"
            autocomplete="true"
            v-model.trim="selectedSystemUser.username"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="password" class="ksp-form-label">
            Password: <span class="required">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            class="ksp-form-control"
            placeholder="--"
            autocomplete="true"
            v-model.trim="selectedSystemUser.password"
          />
          <small id="password-info" class="form-text text-muted">
            Password must contains at least 5 characters.
          </small>
        </div>
      </div>
      <div class="col-md-4">
        <div class="ksp-container-control">
          <label for="repeat-password" class="ksp-form-label">
            Repeat password: <span class="required">*</span>
          </label>
          <input
            id="repeat-password"
            name="repeat-password"
            type="password"
            class="ksp-form-control"
            placeholder="--"
            autocomplete="true"
            v-model.trim="selectedSystemUser.repeatPassword"
          />
          <small id="repeat-password-info" class="form-text text-muted">
            Password must contains at least 5 characters.
          </small>
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
            type="submit"
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
            @click="cancelEmployRecord()"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";
import router from "../../router/index";
import Employees from "../../models/Employees";
import SystemUsers from "../../models/SystemUsers";

export default {
  name: "EmployeesForm",
  props: {
    selectedSystemUser: { type: Object, default: new SystemUsers() },
    selectedEmploy: { type: Object, default: new Employees() },
    isCreation: { type: Boolean, default: true },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["errorResponse"]),
    disabled() {
      if (this.selectedSystemUser.password.length <= 5) return true;
      if (this.selectedSystemUser.repeatPassword.length <= 5) return true;
      if (
        this.selectedSystemUser.password !=
        this.selectedSystemUser.repeatPassword
      ) {
        this.setErrorResponse("Passwords are not the same.");
        return true;
      }
      this.setErrorResponse(null);
      if (!this.selectedSystemUser.username.includes("@")) return true;
      if (!this.selectedEmploy.hiringDate) return true;
      if (this.selectedEmploy.name.length < 1) return true;
      if (this.selectedEmploy.job.length < 1) return true;
      return false;
    },
  },
  methods: {
    ...mapActions(["createEmployees", "updateEmployees", "setErrorResponse"]),
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      reader.onload = (e) => {
        this.selectedEmploy.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.selectedEmploy.photo = "";
    },
    cancelEmployRecord() {
      router.push("/");
    },
    async processCreateForm() {
      this.selectedSystemUser.employ = this.selectedEmploy;
      await this.createEmployees(this.selectedSystemUser);
      if (this.errorResponse.message !== null) return;
    },
    async processUpdateForm() {
      this.selectedSystemUser.employ = this.selectedEmploy;
      await this.updateEmployees(this.selectedSystemUser);
      if (this.errorResponse.message !== null) return;
    },
  },
};
</script>

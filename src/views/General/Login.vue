<template>
  <div class="principal-section">
    <div id="login-form-container">
      <div class="ksp-container-control ksp-login-title">
        <div class="row">
          <div class="col-md-2 center-elements-v">
            <img src="../../assets/company-logo.png" width="100" />
          </div>
          <div class="col-md-10 center-elements-v">
            <div class="row" style="padding: 0px; margin: 0px">
              <div class="col-md-12" style="padding: 0px; margin: 0px">
                <h2>Welcome!</h2>
              </div>
              <div class="col-md-12" style="padding: 0px; margin: 0px">
                <p>Login with the data that your organization gave to you.</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <form @submit.prevent="processForm()">
        <div class="row">
          <div class="col-md-12">
            <div class="ksp-container-control">
              <label for="username" class="ksp-form-label">Username:</label>
              <input
                id="username"
                name="username"
                type="email"
                class="ksp-form-control"
                placeholder="--"
                autocomplete="true"
                v-model.trim="username"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="ksp-container-control">
              <label for="password" class="ksp-form-label"> Password: </label>
              <input
                id="password"
                name="password"
                type="password"
                class="ksp-form-control"
                placeholder="--"
                autocomplete="true"
                v-model.trim="password"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6 center-elements-h">
            <button
              class="ksp-button ksp-button-primary"
              style="width: 80%"
              type="submit"
            >
              Login
            </button>
          </div>
          <div class="col-md-3"></div>
        </div>
      </form>
      <div class="ksp-message-danger" v-if="errorResponse.message">
        {{ errorResponse.message }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SystemUsers from "../../models/SystemUsers";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["errorResponse"]),
    disabledButton() {
      if (!this.username.includes("@")) return true;
      if (this.password.length <= 5) return true;
      return false;
    },
  },
  methods: {
    ...mapActions(["login"]),
    async processForm() {
      let systemUser = new SystemUsers();
      systemUser.Username(this.username);
      systemUser.Password(this.password);
      await this.login(systemUser);
      if (this.errorResponse) if (this.errorResponse.message !== null) return;
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style>
.principal-section {
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url("https://images.pexels.com/photos/6004828/pexels-photo-6004828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
}

#principal-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

#login-form-container {
  position: absolute;
  width: 60%;
  left: 50%;
  top: 50%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 40px;
  padding-bottom: 20px;
  background-color: #fff;
  transform: translate(-50%, -50%);
}

.ksp-login-title {
  margin-bottom: 10px;
  color: #434343;
}

.ksp-message-danger {
  width: 100%;
  color: red;
  text-align: center;
  margin-bottom: 20px;
}

@media (max-width: 1250px) {
  .ksp-login-title .col-md-10 {
    padding-left: 30px;
  }
}

@media (max-width: 1050px) {
  .ksp-login-title .col-md-10 {
    padding-left: 40px;
  }
}

@media (max-width: 940px) {
  #login-form-container {
    width: 80%;
  }

  .ksp-login-title .col-md-10 {
    padding-left: 50px;
  }
}

@media (max-width: 767px) {
  .ksp-login-title .col-md-10 {
    padding-left: 10px;
  }
}
</style>



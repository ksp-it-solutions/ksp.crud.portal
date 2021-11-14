<template>
  <header style="background-color: #0d598b; color: #ffffff">
    <nav
      class="
        navbar navbar-expand-sm navbar-toggleable-sm navbar-light
        border-bottom
        box-shadow
      "
    >
      <div class="container">
        <router-link to="/">
          <img src="../../assets/company-logo.png" title="KSP" width="60" />
        </router-link>
        <router-link
          class="navbar-brand"
          style="color: #ffffff; font-size: 26px; margin-left: 18px"
          to="/"
        >
          KSP
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".navbar-collapse"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="fas fa-bars text-white"></span>
        </button>
        <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row">
          <ul class="navbar-nav flex-grow-1">
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/">
                Employees
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                class="nav-link text-white action"
                :href="
                  $router.resolve({
                    name: 'employees_update',
                    params: { id: systemUser.employId },
                  }).href
                "
                >{{ systemUser.employ.fullName }}</a
              >
            </li>
            <li class="nav-item" style="margin-right: 20px"></li>
            <li class="nav-item">
              <a class="nav-link text-white action" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Navbar",
  props: {},
  computed: {
    ...mapState(["systemUser"]),
    ...mapGetters(["authenticatedUser"]),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<style></style>

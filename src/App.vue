<template>
  <Navbar v-if="authenticatedUser" />
  <div
    class="container"
    v-if="authenticatedUser"
    :style="`width: 100%; min-height: 100%; ${
      !isLoading ? 'margin-bottom: 80px' : ''
    }`"
  >
    <router-view v-show="!isLoading" />
    <Loading v-show="isLoading" />
  </div>
  <router-view v-if="!authenticatedUser" />
  <Footer v-if="authenticatedUser" />
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Navbar from "./components/General/Navbar.vue";
import Footer from "./components/General/Footer.vue";
import Loading from "./components/General/Loading.vue";

export default {
  components: {
    Navbar,
    Footer,
    Loading,
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapGetters(["authenticatedUser"]),
  },
  methods: {
    ...mapActions(["loadLogin"]),
  },
  created() {
    this.loadLogin();
  },
};
</script>

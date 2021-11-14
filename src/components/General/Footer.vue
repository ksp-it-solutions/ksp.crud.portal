<template>
  <footer class="ksp-footer">
    <div class="ksp-footer-container">
      <p class="ksp-footer-text">KSP sample template footer</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.ksp-footer {
  width: 100%;
  height: 70px;
  background-color: #0d598b;
  color: white;
  text-align: center;
}

.ksp-footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0px;
  margin: 0px;
}

.ksp-footer-text {
  padding: 0px;
  margin: 0px;
}
</style>
<template>
  <div class="page-not-found-container">
    <div class="mainbox">
      <div class="err">4</div>
      <i class="far fa-question-circle fa-spin"></i>
      <div class="err2">4</div>
      <div class="msg">
        Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
        existed in the first place?
        <p>Let's go <a href="/">home</a> and try from there.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style>
.page-not-found-container {
  /* background-color: #95c2de; */
  height: 100%;
  width: 100%;
}

.mainbox {
  /* background-color: #95c2de; */
  margin: auto;
  height: 600px;
  width: 600px;
  position: relative;
}

.mainbox .err {
  color: #707070;
  font-size: 11rem;
  position: absolute;
  left: 19%;
  top: 8%;
}

.mainbox .far {
  position: absolute;
  font-size: 8.5rem;
  left: 41%;
  top: 20%;
  color: #707070;
}

.mainbox .err2 {
  color: #707070;
  font-size: 11rem;
  position: absolute;
  left: 69%;
  top: 8%;
}

.mainbox .msg {
  color: #707070;
  text-align: center;
  font-size: 1.6rem;
  position: absolute;
  left: 16%;
  top: 45%;
  width: 75%;
}

.mainbox a {
  text-decoration: none;
  color: #0d598b;
}

.mainbox a:hover {
  text-decoration: underline;
}
</style>
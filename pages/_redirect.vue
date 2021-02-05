<template>
  <div class="container error-container">
    <p>Redirecting...</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$router.push("/");
  },
};
</script>

<style lang="scss">
.error-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}
</style>

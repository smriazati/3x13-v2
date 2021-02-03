<template>
  <div class="film13-main-nav">
    <button class="brand logo" @click="changeActiveFrame('Intro')">
      3 x 13
    </button>
    <div class="dropdown">
      <IntroSectionsNav
        :show-home="true"
        @go-to-home="changeActiveFrame('Intro')"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeActiveFrame(frame) {
      this.$store.commit("grid/changeActiveFrame", frame);
    },
  },
};
</script>
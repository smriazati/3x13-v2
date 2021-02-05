<template>
  <figure class="image">
    <img v-if="loaded" class="image-loader" :src="src" :alt="alt" />
    <div v-else class="placeholder"></div>
  </figure>
</template>

<script>
export default {
  props: {
    height: Number,
    src: String,
    alt: String,
  },
  data() {
    return {
      loaded: false,
    };
  },
  mounted: function () {
    var image = new Image();
    var that = this;
    this.loaded = image.addEventListener("load", function () {
      that.onLoaded();
    }); // This is the key part: it is basically vanilla JS
    image.src = this.src;
  },

  methods: {
    onLoaded() {
      this.loaded = true;
    },
  },
};
</script>

<style lang="scss">
.image-loader {
  animation: 0.5s ease fadeIn;
}
</style>
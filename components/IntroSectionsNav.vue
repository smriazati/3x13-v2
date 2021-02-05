<template>
  <nav class="intro-sections-nav">
    <ul v-if="isDataLoaded">
      <li v-if="showHome">
        <button @click="goToHome">
          {{ aboutData.acf.about_headline }}
        </button>
      </li>
      <li>
        <button
          :class="
            activeIntroSection === 'About' ? 'active-link' : 'inactive-link'
          "
          @click="activateIntroSection('About')"
        >
          About
        </button>
      </li>
      <li>
        <button
          :class="
            activeIntroSection === 'Credits' ? 'active-link' : 'inactive-link'
          "
          @click="activateIntroSection('Credits')"
        >
          Artists
        </button>
      </li>
      <li>
        <button
          :class="
            activeIntroSection === 'Tutorial' ? 'active-link' : 'inactive-link'
          "
          @click="activateIntroSection('Tutorial')"
        >
          {{ aboutData.acf.tutorial_headline }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    showHome: Boolean,
  },
  computed: {
    ...mapState({
      activeFrame: (state) => state.grid.activeFrame,
      activeIntroSection: (state) => state.grid.activeIntroSection,
    }),
    isDataLoaded() {
      if (!this.$store.state.content.isAboutDataLoaded) {
        return false;
      } else {
        return true;
      }
    },
    ...mapGetters({
      aboutData: "content/aboutData",
    }),
  },
  methods: {
    activateIntroSection: function (payload) {
      this.$store.commit("grid/activateIntroSection", payload);
      this.$emit("clicked-section-link");
    },
    goToHome: function () {
      this.$emit("clicked-section-link");
      this.$emit("go-to-home");
    },
  },
};
</script>

<style lang="scss">
$site-width: 1920px;
$transition: 0.3s ease-out all;
$spacer: 10px;

$bp-lg: 1440px;
$bp-type: 1100px;
$bp-sm: 1060px;

$gold: rgb(202, 166, 17);
$dark: rgb(0, 0, 0);
$light: rgb(232, 232, 232);
$gray: rgb(44, 44, 44);
$white: $light;
$tagline-container: 90%;

$film13-grid-bp: 1060px;
$film13-grid-bp-lg: 1600px;

$grid-bp: $film13-grid-bp;
$grid-bp-lg: $film13-grid-bp-lg;

$tagline-container: 90%;

@mixin unsetBtn() {
  background: transparent;
  font-size: 1em;
  letter-spacing: 0;
  text-transform: none;
  padding: 0;
  color: $light;
  &:not(:disabled):hover,
  &:hover {
    cursor: pointer;
    background: transparent;
  }
}

@mixin unsetUl() {
  list-style: none;
  padding-left: 0;
}

.container-intro .intro-sections-nav {
  button {
    @include unsetBtn();
    text-transform: uppercase;
    padding: $spacer * 3;
    color: rgba($light, 0.8);
    transition: $transition;
    &:hover {
      cursor: pointer;
      color: $gold;
    }
    color: rgba($light, 0.4);
    width: 100%;
    height: 100%;
  }

  ul {
    @include unsetUl();
    display: flex;
    width: $tagline-container;
    margin: 0 auto;
    justify-content: space-between;
    text-align: center;
    > * {
      flex: 1;
    }
  }
}
</style>
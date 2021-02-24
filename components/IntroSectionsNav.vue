<template>
  <nav
    class="intro-sections-nav"
    :style="{
      top: offsetTop + 'px',
      left: offsetLeft + 'px',
      width: navWidth + 'px',
    }"
  >
    <ul v-if="isDataLoaded">
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
    offsetTop: Number,
    offsetLeft: Number,
    navWidth: Number,
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

$tagline-container: 60ch;

@mixin unsetBtn() {
  background: transparent;
  font-size: 1em;
  letter-spacing: 0.03em;
  text-transform: none;
  padding: 0;
  color: $light;
  border: 0;
  &:not(:disabled):hover,
  &:hover {
    cursor: pointer;
    background: transparent;
    border: 0;
  }
}

@mixin unsetUl() {
  list-style: none;
  padding-left: 0;
}

.container-intro {
  .intro-sections-nav {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
.container-intro:not(.activate-centered-layout) {
  .intro-sections-nav {
    padding: $spacer * 3 0 $spacer 0;
  }
}

.container-intro .intro-sections-nav {
  margin: 0 auto;
  justify-content: flex-start;
  button {
    @include unsetBtn();
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: $spacer * 3;
    color: rgba($light, 0.8);
    transition: $transition;
    &:hover {
      cursor: pointer;
      color: $gold;
    }
    width: 100%;
    height: 100%;
  }

  ul {
    @include unsetUl();
    display: flex !important;
    // width: $tagline-container;
    // margin: 0 auto;
    justify-content: space-between;
    text-align: center;
    > * {
      flex: 0 0 33%;
    }
  }
}
</style>
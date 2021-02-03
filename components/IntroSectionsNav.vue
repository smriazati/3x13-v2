<template>
  <nav class="intro-sections-nav">
    <ul>
      <li>
        <button v-if="showHome" @click="goToHome">Home</button>
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
          How it works
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    showHome: Boolean,
  },
  computed: {
    ...mapState({
      activeFrame: (state) => state.grid.activeFrame,
      activeIntroSection: (state) => state.grid.activeIntroSection,
    }),
  },
  methods: {
    activateIntroSection: function (payload) {
      this.$store.commit("grid/activateIntroSection", payload);
    },
    goToHome: function () {
      this.$emit("go-to-home");
    },
  },
};
</script>
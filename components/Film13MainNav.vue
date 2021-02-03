<template>
  <div class="film13-main-nav">
    <button class="brand logo" @click="changeActiveFrame('Intro')">
      3 x 13
    </button>
    <div class="mobile-menu-button" @click="toggleMenuCollapse">
      <div v-if="isMobileMenuCollapsed" class="icon">
        <SvgThing name="Hamburger" />
      </div>
      <div v-else class="icon">
        <SvgThing name="Close" />
      </div>
    </div>
    <div
      :class="
        isMobileMenuCollapsed ? 'mobile-menu-collapsed' : 'mobile-menu-open'
      "
      class="dropdown"
    >
      <IntroSectionsNav
        :show-home="true"
        @clicked-section-link="clickedSectionLink"
        @go-to-home="changeActiveFrame('Intro')"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobileMenuCollapsed: true,
    };
  },
  methods: {
    changeActiveFrame(frame) {
      this.$store.commit("grid/changeActiveFrame", frame);
    },
    clickedSectionLink() {
      this.isMobileMenuCollapsed = true;
    },
    toggleMenuCollapse() {
      this.isMobileMenuCollapsed = !this.isMobileMenuCollapsed;
      console.log("menu collapse is ", this.isMobileMenuCollapsed);
      if (this.isMobileMenuCollapsed) {
        this.$emit("mobile-menu-open"); // play film13
      }
      if (!this.isMobileMenuCollapsed) {
        this.$emit("mobile-menu-close"); // pausefilm13
      }
    },
  },
};
</script>
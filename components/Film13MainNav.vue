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
      if (!this.isMobileMenuCollapsed) {
        this.isMobileMenuCollapsed = true;
      }
    },
    clickedSectionLink() {
      this.isMobileMenuCollapsed = true;
    },
    toggleMenuCollapse() {
      const gridBp = 1060;
      if (window.innerWidth < gridBp) {
        this.isMobileMenuCollapsed = !this.isMobileMenuCollapsed;
        console.log("menu collapse is ", this.isMobileMenuCollapsed);
        if (this.isMobileMenuCollapsed) {
          this.$emit("mobile-menu-open"); // play film13
        }
        if (!this.isMobileMenuCollapsed) {
          this.$emit("mobile-menu-close"); // pausefilm13
        }
      }
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

@mixin slideInStartKey {
  transform: translateX(-100px);
  opacity: 0;
}

@keyframes slideRight {
  from {
    transform: translateX(-15ch);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

// FILM13-MAIN-NAV component

.film13-main-nav {
  button {
    @include unsetBtn;
    text-transform: uppercase;
    &:hover {
      color: $gold;
    }
  }
  ul {
    @include unsetUl;
  }
  .brand {
    font-size: 36px;
  }
}

@media (min-width: $film13-grid-bp + 1) {
  .film13-grid-wrapper .film13-main-nav {
    ul {
      @include unsetUl;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .film13-grid-wrapper .film13-main-nav {
    text-align: left;
    .mobile-menu-button,
    .logo {
      @include slideInStartKey;
    }
    .layer-stack-show & {
      .mobile-menu-button,
      .logo {
        animation: 0.5s ease-in forwards slideRight;
      }
    }
    button {
      text-align: left;
      width: 100%;
    }
    .dropdown {
      opacity: 0;
      transition: opacity 0.3s;
      @include slideInStartKey();
    }
    &:hover {
      .dropdown {
        opacity: 1;
        animation: 0.3s ease-in-out forwards slideRight;
      }
    }
    li {
      width: 100%;
      padding: $spacer/4 0;
      button {
        width: 100%;
      }
    }
  }
}

@media (max-width: $film13-grid-bp) {
  .film13-grid-wrapper .film13-main-nav {
    text-align: center;
    ul {
      text-align: center;
      > * {
        button {
          padding: $spacer;
        }
      }
    }
    * {
      color: rgba($light, 0.7);
      transition: $transition;
    }
  }
  .mobile-menu-button {
    width: 30px;
    height: 30px;
    position: absolute;
    top: $spacer/2;
    left: $spacer/2;
  }
  .dropdown {
    transition: 0.3s ease left, 0.3s ease background;
    position: absolute;
    z-index: 999;
    top: -100vh;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    * {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    nav {
      height: 60%;
      margin-top: 10%;
    }
    ul {
      justify-content: space-between;
      height: 100%;
      li button {
        color: $light;
        font-size: 30px;
        &:hover {
          color: $gold;
        }
      }
    }
  }
  .mobile-menu-open.dropdown {
    left: 0;
    top: 50px;
    background: rgba($dark, 1);
  }
}

// mobile nav
@media (min-width: $film13-grid-bp + 1) {
  .mobile-menu-button {
    // display: none;
    width: 25px;
    height: 25px;
    opacity: 1;
    transition: 0.1s ease opacity;
    .icon,
    .icon > * {
      width: 25px;
      height: 25px;
    }
    .icon * {
      fill: rgba($light, 0.5) !important;
    }
  }

  .film13-main-nav:hover {
    .mobile-menu-button .icon * {
      fill: $gold !important;
    }
  }
}

// mobile landscape

@media (max-width: $grid-bp) and (orientation: landscape) {
  .mobile-menu-open.dropdown {
    top: 0px;
    z-index: 990;
    padding-top: 50px;
  }
  .dropdown ul li button {
    font-size: 24px;
  }
  .brand.logo {
    font-size: 24px;
    white-space: nowrap;
    margin-bottom: 11px;
  }
  .brand.logo,
  .mobile-menu-button {
    position: relative;
    z-index: 998;
  }
  .mobile-menu-button .icon {
    width: 20px;
    height: 20px;
  }
}
</style>
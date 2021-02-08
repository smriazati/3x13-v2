<template>
  <section ref="tutorialFrame" class="tutorialFrame">
    <div v-if="isDataLoaded" class="tab-group-container">
      <h2 class="tab-item-title tab-item-title-full-width">
        {{ aboutData.acf.tutorial_headline }}
      </h2>
      <div class="tab-item-content">
        <ul class="tutorial-list">
          <li
            v-for="item in aboutData.acf.tutorial_list"
            :key="item.id"
            class="tutorial-list-item"
          >
            <span v-if="item.icon" class="tutorial-list-item-image">
              <ImageLoader :src="item.icon.sizes.medium" :alt="item.icon.alt" />
            </span>
            <span v-else class="placeholder-icon"></span>
            <span v-if="item.text" class="tutorial-list-item-text">{{
              item.text
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    activeIntroSection: {
      type: String,
      required: false,
    },
  },
  computed: {
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
};
</script>



<style lang="scss">
$site-width: 1920px;
$transition: 0.3s ease-out all;
$spacer: 10px;

$gold: rgb(202, 166, 17);
$dark: rgb(0, 0, 0);
$light: rgb(232, 232, 232);
$gray: rgb(44, 44, 44);
$white: $light;

$bp-lg: 1440px;
$bp-type: 1100px;
$bp-sm: 1060px;

@mixin unsetUl() {
  list-style: none;
  padding-left: 0;
}

//
.tutorialFrame {
  margin: 0 auto;
  @media (min-width: $bp-sm + 1) {
    max-width: 800px;
    // padding: $spacer;
  }
  // border: 1px solid $gold;
}

// tutorial

.tutorial-list {
  @include unsetUl;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 60px;
  @media (min-width: $bp-sm + 1) {
    width: 80%;
    margin: 0 auto;
  }
  > * {
    flex: 0 0 48%;
  }
  .tutorial-list-item-image {
    .image {
      margin-bottom: 0 !important;
    }
    img {
      margin-bottom: 0 !important;
      max-width: 100%;
      @media (min-width: $bp-sm + 1) {
        max-width: 150px;
        max-height: 150px;
      }
      @media (min-width: 768px) and (max-width: $bp-sm) {
        max-width: 200px;
        max-height: 200px;
      }
      @media (max-width: 768px) {
        max-height: 15vh;
      }
    }
  }
  .tutorial-list-item {
    display: flex;
    flex-direction: column;
    padding: $spacer;
    @media (min-width: $bp-sm) {
      padding: $spacer * 3;
      padding-top: 0;
    }
    text-align: center;
  }
  .placeholder-icon {
    max-width: 100%;
    @media (min-width: $bp-sm + 1) {
      max-width: 150px;
      max-height: 150px;
    }
    margin: 0 auto;
    background: $gray;
  }
  .tutorial-list-item-text {
    margin-bottom: 0 !important;
  }

  .tutorial-list-item-text {
    @media (min-width: $bp-sm + 1) {
      line-height: 1.4em;
      font-size: 1.2em;
    }

    text-transform: uppercase;
  }
}
</style>
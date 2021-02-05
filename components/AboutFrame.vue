<template>
  <section>
    <div v-if="isDataLoaded">
      <div class="tab-group-container">
        <h2
          class="tab-item-title"
          :class="
            isActiveTab === 'About' ? 'active-tab-title' : 'inactive-tab-title'
          "
          @click="activateTab('About')"
        >
          {{ aboutData.acf.about_headline }}
        </h2>

        <h2
          class="tab-item-title"
          :class="
            isActiveTab === 'Supporters'
              ? 'active-tab-title'
              : 'inactive-tab-title'
          "
          @click="activateTab('Supporters')"
        >
          {{ aboutData.acf.supporters_headline }}
        </h2>

        <div
          class="tab-item-content"
          :class="isActiveTab === 'About' ? 'active-tab' : 'inactive-tab'"
        >
          <div
            v-if="aboutData.acf.about_film_title"
            class="body-text film-title nunito"
          >
            <h3>{{ aboutData.acf.about_film_title }}</h3>
          </div>
          <div
            class="body-text about-body-text"
            v-html="aboutData.acf.about_body_text"
          ></div>
        </div>

        <div
          class="tab-item-content"
          :class="isActiveTab === 'Supporters' ? 'active-tab' : 'inactive-tab'"
        >
          <div
            class="body-text supporters-text"
            v-html="aboutData.acf.supporters_body_text"
          ></div>
          <div class="body-text-narrow-container">
            <div
              v-if="aboutData.acf.supporters_special_thanks_title"
              class="supporters-special-thanks-title"
            >
              <h3>{{ aboutData.acf.supporters_special_thanks_title }}</h3>
            </div>
            <div
              v-if="aboutData.acf.supporters_special_thanks_body_text"
              class="body-text supporters-special-thanks-text"
            >
              <p>{{ aboutData.acf.supporters_special_thanks_body_text }}</p>
            </div>
            <div class="media-gallery supporters-gallery">
              <ul>
                <li
                  v-for="item in supporterLogos"
                  :key="item.ID"
                  class="supporter-logo"
                >
                  <img :src="item.sizes.medium" :alt="item.alt" />
                </li>
              </ul>
            </div>
          </div>
        </div>
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
  data() {
    return {
      isActiveTab: "About",
    };
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
    supporterLogos: function () {
      if (!this.aboutData) {
        return false;
      }
      const logos = this.aboutData.acf.supporters_logo_gallery;
      if (!logos) {
        return false;
      }

      let logosArr = Object.values(logos);
      let logosArrFiltered = logosArr.filter((el) => el !== false);
      return logosArrFiltered;
    },
  },
  methods: {
    activateTab(tab) {
      console.log(tab);
      this.isActiveTab = tab;
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

$blackBg: rgba($dark, 0.85);

@mixin unsetUl() {
  list-style: none;
  padding-left: 0;
}

.supporters-gallery {
  ul {
    @include unsetUl;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    > * {
      flex: 0 0 22%;
      padding: 0 $spacer;
      @media (max-width: $bp-sm) {
        flex: 0 0 50%;
      }
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 100%;
        @media (max-width: $bp-sm) {
          max-width: 100px;
          margin: 0 auto;
        }
      }
    }
  }
}

.body-text-narrow-container {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  margin-top: 30px;
  * {
    color: rgba($light, 0.7);
  }
  h3 {
    font-size: 14px;
    margin-bottom: $spacer !important;
  }
  p {
    font-size: 14px;
    line-height: 22px;
  }
}

.film-title {
  text-align: center;
  h3 {
    text-transform: none;
    font-size: 30px;
  }
}
</style>
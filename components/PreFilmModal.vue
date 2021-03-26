<template>
  <section ref="preFilmFrame" class="pre-film-modal intro-frame">
    <div v-if="isDataLoaded" class="tab-group-container">
      <h2 class="tab-item-title tab-item-title-full-width">
        {{ aboutData.acf.prefilmmodal_headline }}
      </h2>
      <div class="tab-item-content">
        <ul class="tutorial-list">
          <li
            v-for="item in aboutData.acf.prefilmmodal_list"
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

        <div class="continue-section">
          <div class="select-language">
            <div class="select">
              <select
                id="languages"
                v-model="selectedLang"
                name="languages"
                :class="selectedLang === '' ? 'highlight' : 'no-highlight'"
              >
                <option disabled value="">Select your language</option>
                <option
                  v-for="(item, index) in languages"
                  :key="index"
                  :value="item.language_subtitle_code"
                >
                  {{ item.language_label }}
                </option>
              </select>
            </div>
          </div>
          <div ref="continueBtn" class="continue-button">
            <button :disabled="selectedLang === ''" @click="continueToFilm">
              {{ aboutData.acf.prefilmmodal_continue_button_text }}
            </button>
            <label
              for="languages"
              :class="selectedLang === '' ? 'show' : 'hide'"
              >{{ aboutData.acf.prefilmmodal_language_select_text }}</label
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
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
      languages: "content/languages",
    }),
    ...mapState({
      subtitleLanguage: (state) => state.grid.subtitleLanguage,
    }),
    selectedLang: {
      get() {
        return this.$store.state.grid.subtitleLanguage;
      },
      set(value) {
        this.$store.commit("grid/setSubtitle", value);
      },
    },
  },
  watch: {
    selectedLang() {
      if (this.selectedLang !== "") {
        this.$refs.continueBtn.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
  methods: {
    continueToFilm() {
      this.$emit("continue-to-film");
    },
  },
};
</script>

<style lang="scss">
.layer-stack-prefilmmodal-frames {
  transition: 0.3s ease opacity;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.layer-stack-prefilmmodal-frames.layer-stack-hide {
  opacity: 0;
}
.layer-stack-prefilmmodal-frames.layer-stack-show {
  opacity: 1;
}

// @media (min-height: 600px) {
//   .layer-stack-prefilmmodal-frames {
//     .pre-film-modal {
//       .tab-group-container {
//         height: auto;
//       }
//     }
//   }
// }

.continue-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  .select-language {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    margin-bottom: 30px;
    label {
      line-height: 1.2em;
      font-size: 1em;
      font-style: italic;
      color: #767676;
    }
    .select {
      position: relative;
      margin-bottom: 0 !important;

      &::after {
        content: " ";
        display: block;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 10px solid #767676;
        position: absolute;
        right: 22px;
        top: 28px;
        height: auto;
      }
      select {
        padding: 11px 44px;
        border: 0;
        margin: 10px;
        font-size: 1em;
        font-family: "Nunito Sans", sans-serif;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        text-align: center;
        color: #2c2c2c;
        background: #e8e8e8;
        border: 2px solid #e8e8e8;
        &.highlight {
          border: 2px solid #caa611;
        }
      }
    }
  }
}

// mobile layouts

@media (max-width: 960px) {
  .pre-film-modal {
    .tab-item-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding-top: 0;
      .tutorial-list {
        flex-shrink: 2;
      }
      .continue-section {
        flex: 60%;
        margin-top: 10px;
      }
    }
  }
}

@media (max-width: 960px) and (orientation: landscape) {
  .pre-film-modal {
    .tab-item-content {
      flex-wrap: nowrap;
    }
  }
}

.continue-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    line-height: 1.2em;
    font-size: 1em;
    font-style: italic;
    color: #767676;
    text-align: center;
    margin-top: 10px;
    transition: 0.3s ease opacity;
    &.hide {
      opacity: 0;
    }
    &.show {
      opacity: 1;
    }
  }
}
</style>
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
          <div
            :class="selectedLang === '' ? 'no-lang-selected' : 'lang-selected'"
            class="select-language"
          >
            <button
              :class="isLanguageMenuOpen ? 'open' : 'close'"
              class="btn-flat dropdown-trigger"
              @click="openDropdown"
            >
              Select your language
              <!-- <span v-if="selectedLang === '' || !isLanguageMenuOpen">
                Select your language</span
              >
              <span v-else>Language: {{ selectedLangLabel }} </span> -->
            </button>
            <ul
              :class="isLanguageMenuOpen ? 'show' : 'hide'"
              class="dropdown-list"
            >
              <li
                v-for="(item, index) in languages"
                :key="index"
                class="link-hover"
                :class="
                  selectedLangLabel === item.language_label
                    ? 'active-sub'
                    : 'inactive-sub'
                "
                @click="
                  setLanguage(item.language_subtitle_code, item.language_label)
                "
              >
                {{ item.language_label }}
              </li>
            </ul>
          </div>
          <div ref="continueBtn" class="continue-button">
            <button
              class="btn-flat"
              :disabled="selectedLang === ''"
              @click="continueToFilm"
            >
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
  data() {
    return {
      isLanguageMenuOpen: false,
      selectedLangLabel: "",
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
    toggleDropdown() {
      this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
    },
    openDropdown() {
      this.isLanguageMenuOpen = true;
    },
    setLanguage(code, label) {
      this.$store.commit("grid/setSubtitle", code);
      this.selectedLangLabel = label;
      // if (this.isLanguageMenuOpen) {
      //   this.isLanguageMenuOpen = false;
      // }
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

$grayedOut: rgb(75, 75, 75);
.select-language {
  overflow: hidden;
  &.lang-selected {
    button {
      background: $grayedOut !important;
      border: 2px solid $grayedOut !important;
    }
    li.inactive-sub {
      color: $grayedOut !important;
      &:hover {
        color: rgb(202, 166, 17) !important;
      }
    }
    .dropdown-list {
      border: 2px solid $grayedOut !important;
    }
  }
}
.dropdown-trigger {
  z-index: 10;
  position: relative;
  &.open {
    background: rgb(202, 166, 17);
    &:hover {
      cursor: default;
    }
  }
}
.dropdown-list {
  z-index: 9;
  position: relative;
  list-style: none;
  padding-left: 0;
  font-size: 1em;
  padding: 10px;
  border: 2px solid rgb(202, 166, 17);
  li {
    margin-bottom: 0 !important;
    padding: 6px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    &.active-sub {
      color: rgb(202, 166, 17);
      &:hover {
        cursor: default;
      }
    }
  }
  transition: 0.3s ease all;
  &.show {
    transform: translateY(0);
    height: auto;
    opacity: 1;
  }
  &.hide {
    transform: translateY(-150px);
    height: 0;
    opacity: 0;
  }
}
</style>
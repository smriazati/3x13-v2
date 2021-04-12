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
            <label
              for="selectLang"
              :class="selectedLang === '' ? 'show' : 'hide'"
              >{{ aboutData.acf.prefilmmodal_language_select_text }}</label
            >
            <button
              name="selectLang"
              :class="isLanguageMenuOpen ? 'open' : 'close'"
              class="btn-flat dropdown-trigger"
              @click="openDropdown"
            >
              Select
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
                  selectedLang === item.language_subtitle_code
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
            <div ref="continueBtn" class="continue-button">
              <button
                class="btn-flat"
                :class="selectedLang == '' ? 'hide' : 'show'"
                @click="continueToFilm"
              >
                {{ aboutData.acf.prefilmmodal_continue_button_text }}
              </button>
            </div>
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
  mounted() {
    this.$emit("on-component-mount");
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
    closeDropdown() {
      this.isLanguageMenuOpen = false;
    },
    setLanguage(code, label) {
      this.$store.commit("grid/setSubtitle", code);
      this.selectedLangLabel = label;
      if (this.isLanguageMenuOpen) {
        this.closeDropdown();
      }
    },
  },
};
</script>

<style lang="scss">
.layer-stack-prefilmmodal-frames {
  // transition: 0.3s ease opacity;
  display: flex;
  flex-direction: column;
  justify-content: center;
  section {
    z-index: 1000;
    position: relative;
  }
}

.tutorial-list {
  justify-content: center;
  margin: 0 auto;
}

.continue-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.continue-button button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px 0;
  &:hover {
    padding: 10px 0;
  }
}
.icon-holder {
  width: 50px;
  height: 50px;
  margin-bottom: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-bottom: 0 !important;
    width: 50px;
    height: 50px;
  }
}

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
    // button.dropdown-trigger {
    //   background: $grayedOut !important;
    //   border: 2px solid $grayedOut !important;
    // }
    // li.inactive-sub {
    //   color: $grayedOut !important;
    //   &:hover {
    //     color: rgb(202, 166, 17) !important;
    //   }
    // }
    // .dropdown-list {
    //   border: 2px solid $grayedOut !important;
    // }
  }
}

.lang-selected .dropdown-trigger {
  background: transparent !important;
  border: 2px solid $grayedOut !important;
  color: #7b7b7b !important;
  &:hover,
  &.open {
    color: #fff !important;
    background: rgb(202, 166, 17) !important;
    border: 2px solid rgb(202, 166, 17) !important;
  }
}

.dropdown-list.show {
  margin-bottom: 15px;
}

.continue-button button {
  &.hide {
    opacity: 0;
    max-height: 0;
  }
  &.show {
    opacity: 1;
    max-height: auto;
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
    overflow: hidden;
    opacity: 0;
  }
}

.select-language {
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 15px;
  }
  label {
    font-style: italic;
    opacity: 0.8;
  }
  .continue-button {
    width: 100%;
    button {
      width: 100%;
    }
  }
}
</style>
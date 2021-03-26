<template>
  <ul v-if="isDataLoaded" class="subtitles">
    <li
      v-for="(item, index) in languages"
      :key="index"
      :data-code="item.language_subtitle_code"
      :class="
        selectedLang === item.language_subtitle_code
          ? 'active-sub'
          : 'inactive-sub'
      "
      @click="subtitleChange(item.language_subtitle_code)"
    >
      {{ item.language_label }}
    </li>
  </ul>
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
    selectedLang: {
      // return this.$store.state.grid.activeIntroSection;
      // getter
      get: function () {
        return this.$store.state.grid.subtitleLanguage;
      },
      // setter
      set: function (payload) {
        this.$store.commit("grid/setSubtitle", payload);
      },
    },
  },
  methods: {
    subtitleChange(payload) {
      if (payload === this.activeSubtitle) {
        this.$store.commit("grid/deactivateSubtitle", payload);
      } else {
        this.$store.commit("grid/setSubtitle", payload);
      }
    },
  },
};
</script>

<style lang="scss">
$spacer: 10px;

$gold: rgb(202, 166, 17);
$dark: rgb(12, 11, 11);
$light: rgb(232, 232, 232);
$gray: rgb(44, 44, 44);

.subtitles ul {
  justify-content: flex-start;
  > li {
    margin-right: $spacer * 3;
    &:last-child {
      margin-right: 0;
    }
  }
}

.subtitles {
  ul {
    margin-top: $spacer;
    display: flex;
    padding: 0;
    list-style: none;
    justify-content: space-between;
    li {
      &.active-sub {
        color: $gold;
      }
      &:hover {
        cursor: pointer;
        color: $gold;
      }
    }
  }
}
</style>
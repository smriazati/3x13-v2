<template>
  <section ref="tutorialFrame" class="tutorialFrame">
    <div v-if="isDataLoaded" class="tab-item-content">
      <h2 class="section-title">
        {{ aboutData.acf.tutorial_headline }}
      </h2>
      <!-- <div class="body-text" v-html="aboutData.acf.tutorial_body_text"></div> -->
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



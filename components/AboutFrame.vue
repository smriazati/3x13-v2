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
          <div class="media-gallery supporters-gallery">
            <ul>
              <li
                v-for="item in aboutData.acf.supporters_logo_gallery"
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
  },
  methods: {
    activateTab(tab) {
      console.log(tab);
      this.isActiveTab = tab;
    },
  },
};
</script>
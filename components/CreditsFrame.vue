<template>
  <section ref="creditsFrame">
    <div v-if="isDataLoaded" class="tab-group-container">
      <h2
        class="tab-item-title"
        :class="
          isActiveTab === 'Filmmakers'
            ? 'active-tab-title'
            : 'inactive-tab-title'
        "
        @click="activateTab('Filmmakers')"
      >
        Filmmakers
      </h2>

      <h2
        class="tab-item-title"
        :class="
          isActiveTab === 'Artists' ? 'active-tab-title' : 'inactive-tab-title'
        "
        @click="activateTab('Artists')"
      >
        Performers
      </h2>

      <div
        ref="filmmakersItemContent"
        class="tab-item-content tab-item-content-accordion"
        :class="isActiveTab === 'Filmmakers' ? 'active-tab' : 'inactive-tab'"
      >
        <ul
          ref="creditsList"
          :class="
            areCollapsedFilmmakersHidden
              ? 'accordions-hide-collapsed'
              : 'accordions-show-collapsed'
          "
          class="credits-list"
        >
          <CreditItem
            v-for="item in primaryCredits"
            :key="item.id"
            :item="item"
            type="primary"
            @on-filmmaker-accordion-toggle="toggleOtherFilmmakerAccordions"
          />
          <CreditItem
            v-for="item in secondaryCredits"
            :key="item.id"
            :item="item"
            type="secondary"
            class="secondary"
          />
        </ul>
      </div>

      <div
        ref="artistsItemContent"
        class="tab-item-content tab-item-content-accordion"
        :class="isActiveTab === 'Artists' ? 'active-tab' : 'inactive-tab'"
      >
        <ul
          ref="creditsListArtists"
          :class="
            areCollapsedArtistsHidden
              ? 'accordions-hide-collapsed'
              : 'accordions-show-collapsed'
          "
          class="credits-list"
        >
          <CreditItem
            v-for="item in artistCredits"
            :key="item.id"
            :item="item"
            type="artist"
            @on-artist-accordion-toggle="toggleOtherArtistAccordions"
          />
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
  data() {
    return {
      isActiveTab: "Filmmakers",
      areCollapsedArtistsHidden: false,
      areCollapsedFilmmakersHidden: false,
      savedScrollPlaceFilmmakers: 0,
      savedScrollPlaceArtists: 0,
    };
  },
  computed: {
    isDataLoaded() {
      if (!this.$store.state.content.isCreditsDataLoaded) {
        return false;
      } else {
        return true;
      }
    },
    ...mapGetters({
      artistCredits: "content/artistCredits",
      primaryCredits: "content/primaryCredits",
      secondaryCredits: "content/secondaryCredits",
    }),
  },

  methods: {
    activateTab(tab) {
      console.log(tab);
      this.isActiveTab = tab;
    },
    setLastPlace() {},
    scrollToLastPlace() {},
    toggleOtherArtistAccordions: function (payload) {
      this.areCollapsedArtistsHidden = !this.areCollapsedArtistsHidden;

      const top = this.$refs.artistsItemContent;

      if (this.areCollapsedArtistsHidden) {
        this.savedScrollPlaceArtists = top.scrollTop;
        top.scrollTop = 0;
      } else {
        top.scrollTop = this.savedScrollPlaceArtists;
      }
    },
    toggleOtherFilmmakerAccordions: function (payload) {
      this.areCollapsedFilmmakersHidden = !this.areCollapsedFilmmakersHidden;
      const top = this.$refs.filmmakersItemContent;

      if (this.areCollapsedFilmmakersHidden) {
        this.savedScrollPlaceFilmmakers = top.scrollTop;
        top.scrollTop = 0;
        // console.log("scrolling to top");
      } else {
        top.scrollTop = this.savedScrollPlaceFilmmakers;
        // console.log("scrolling to ", this.savedScrollPlaceFilmmakers);
      }
    },
  },
};
</script>
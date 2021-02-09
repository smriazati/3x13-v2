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
      scrollerFilms: null,
      scrollerArtists: null,
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
  mounted() {
    this.$emit("on-component-mount");
  },
  methods: {
    activateTab(tab) {
      this.isActiveTab = tab;
      if (tab === "Artists") {
        this.scrollToTopArtists();
      } else {
        this.scrollToTopFilms();
      }
    },
    setLastPlace() {},
    scrollToLastPlace() {},
    scrollToTopArtists: function () {
      const top = this.$refs.artistsItemContent;
      if (top) {
        top.scrollTop = 0;
      }
    },
    scrollToTopFilms: function () {
      const top = this.$refs.filmmakersItemContent;
      if (top) {
        top.scrollTop = 0;
      }
    },
    toggleOtherArtistAccordions: function (payload) {
      this.areCollapsedArtistsHidden = !this.areCollapsedArtistsHidden;
      const top = this.$refs.artistsItemContent;
      if (this.areCollapsedArtistsHidden) {
        this.savedScrollPlaceArtists = top.scrollTop;
        this.scrollToTopArtists();
      } else {
        clearTimeout(this.scrollerArtists);
        this.scrollerArtists = setTimeout(() => {
          const top = this.$refs.artistsItemContent;
          top.scrollTop = this.savedScrollPlaceArtists;
          // console.log("scrolling to ", position);
        }, 50);
      }
    },
    toggleOtherFilmmakerAccordions: function (payload) {
      this.areCollapsedFilmmakersHidden = !this.areCollapsedFilmmakersHidden;
      const top = this.$refs.filmmakersItemContent;
      if (this.areCollapsedFilmmakersHidden) {
        this.savedScrollPlaceFilmmakers = top.scrollTop;
        this.scrollToTopFilms();
      } else {
        clearTimeout(this.scrollerFilms);
        this.scrollerFilms = setTimeout(() => {
          const top = this.$refs.filmmakersItemContent;
          top.scrollTop = this.savedScrollPlaceFilmmakers;
          // console.log("scrolling to ", position);
        }, 50);
      }
    },
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

// credits

ul.credits-list {
  @include unsetUl;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  padding-bottom: $spacer * 3;
  > * {
    place-self: center;
  }

  .credit-item-header-text {
    text-align: center;
  }
}
.credit-component .role {
  text-transform: none;
  letter-spacing: 0.03em;
  max-width: 25ch;
  margin: 0 auto;
}

// credits accordion

.credit-component {
  grid-column: span 1;
  .credit-item-header {
    margin-top: $spacer * 6;
    text-align: center;
  }

  &:not(.secondary) .credit-item-header {
    cursor: pointer;
  }

  &.accordion-open {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 3;
  }

  &.accordion-collapsed {
    width: 100%;
    height: 100%;
  }
}

.accordion-open {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  .credit-item-header {
    // display: flex;
    // flex-direction: column;
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 2;
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    grid-template-rows: repeat(2, min-content);
    .icon {
      width: 20px;
      height: 20px;
      grid-column-start: 1;
      grid-column-end: 1;
      grid-row-start: 1;
      grid-row-end: 2;
      place-self: center;
    }
    .credit-item-image {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    .credit-item-header-text {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
    }
  }
  .credit-item-bio {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    place-self: center;
    @media (min-width: $bp-sm) {
      padding-right: 22px;
    }
    padding-top: 30px;
  }
}

.accordion-collapsed {
  .back-button {
    display: none;
  }
}
.accordions-hide-collapsed {
  .accordion-collapsed {
    display: none;
  }
}

.credit-component.secondary {
  grid-column: span 2;
  a {
    color: $light;
    &:hover {
      color: $gold;
    }
  }
}

.credits-section a {
  color: $light;
  &:hover {
    color: $gold;
  }
}
@media (min-width: $bp-sm) {
  .credit-item-image figure,
  .credit-item-image .placeholder {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    img {
      max-width: 100%;
    }
  }
}
@media (max-width: $bp-sm) {
  .credit-item-image {
    max-width: 100px;
    margin: 0 auto;
    img {
      max-width: 100%;
    }
  }
  .credit-item-header-text {
    h2 {
      font-size: 1.1em;
      line-height: 1.3em;
    }
    h3 {
      margin-top: $spacer/2;
      font-size: 12px;
      line-height: 16px;
    }
  }

  .credit-component.accordion-open {
    display: flex;
    flex-direction: column;
    .credit-item-bio {
      margin-top: $spacer;
    }
  }
}

.credit-component.secondary:first-child {
  margin-top: $spacer * 3;
}
.credit-item-image {
  margin-bottom: $spacer;
}
.credit-item-header.credit-item-visible {
  padding: 0 10px;
}
.website-link.icon,
.website-link.icon > * {
  height: 12px;
  width: 12px;
  vertical-align: text-top;
  &:hover {
    fill: $gold !important;
  }
}
</style>

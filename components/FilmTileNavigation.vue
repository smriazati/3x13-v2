<template>
  <nav class="film-tile-navigation">
    <div v-if="filmData && !areTilesHidden" class="modal-navigation-container">
      <div
        v-if="prevModal >= 0"
        class="modal-navigation-item modal-navigation-prev"
        @click="goToPrevModal()"
      >
        <div class="text">
          <h2>
            {{ filmData[prevModal].acf.artist_first_name }}
          </h2>
          <h3>{{ filmData[prevModal].acf.artist_country }}</h3>
        </div>
        <ImageLoader
          :src="filmData[prevModal].acf.film_poster_image.sizes.large"
          :alt="filmData[prevModal].acf.film_poster_image.alt"
        />
      </div>

      <div
        v-if="nextModal >= 0"
        class="modal-navigation-item modal-navigation-prev"
        @click="goToNextModal()"
      >
        <div class="text">
          <h2>
            {{ filmData[nextModal].acf.artist_first_name }}
          </h2>
          <h3>{{ filmData[nextModal].acf.artist_country }}</h3>
        </div>
        <ImageLoader
          :src="filmData[nextModal].acf.film_poster_image.sizes.large"
          :alt="filmData[nextModal].acf.film_poster_image.alt"
        />
      </div>
    </div>

    <div
      v-if="!areTilesHidden && !film13Replay"
      class="countdown"
      @click="goToNextModal()"
    >
      <button>Continue in {{ formattedTimeLeft }}</button>
    </div>

    <div
      v-if="!areTilesHidden && film13Replay"
      class="countdown"
      @click="playFirstModal()"
    >
      <button>Continue in {{ formattedTimeLeft }}</button>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    countdownDuration: Number,
    film13Replay: Boolean,
  },
  data() {
    return {
      timerInterval: null,
      timePassed: 0,
      areTilesHidden: false,
    };
  },
  computed: {
    ...mapState({
      activeModal: (state) => state.grid.activeModal,
      prevModal: (state) => state.grid.prevModal,
      nextModal: (state) => state.grid.nextModal,
    }),
    ...mapGetters({
      filmData: "content/filmData",
    }),
    timeLimit() {
      return this.countdownDuration;
    },
    timeLeft() {
      return this.timeLimit - this.timePassed;
    },
    formattedTimeLeft() {
      if (this.timeLeft > 0) {
        const timeLeft = this.timeLeft;
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
      } else {
        return "0:00";
      }
    },
  },
  watch: {
    formattedTimeLeft() {
      if (this.timeLeft === 0) {
        if (this.film13Replay) {
          this.playFirstModal();
        } else {
          this.goToNextModal();
        }
      }
    },
  },
  created() {
    if (this.film13Replay) {
      // set modals for replay options, 0 & 11
      // console.log("setting modal vals");
      if (this.prevModal || this.activeModal) {
        this.$store.commit("grid/createPrevNextModalsForReplay");
      }
    }
  },
  mounted() {
    this.startTimer();
    // console.log("next is " + this.nextModal, "prev is " + this.prevModal);
  },
  methods: {
    hideTiles() {
      this.areTilesHidden = true;
      // this.$emit("reset-film13");
    },
    goToPrevModal() {
      if (this.film13Replay) {
        this.hideTiles();
      }
      this.deactivateReplay();
      this.$store.commit("grid/changeModalState", "player");
      this.$store.commit("grid/activateModal", this.prevModal);

      if (this.film13Replay) {
        this.$store.commit("grid/changeActiveFrame", "FilmModal");
      }
    },
    goToNextModal() {
      if (this.film13Replay) {
        this.hideTiles();
      }
      this.deactivateReplay();

      this.$store.commit("grid/changeModalState", "player");
      this.$store.commit("grid/activateModal", this.nextModal);
      if (this.film13Replay) {
        this.$store.commit("grid/changeActiveFrame", "FilmModal");
      }
    },
    playFirstModal() {
      if (this.film13Replay) {
        this.hideTiles();
      }
      this.deactivateReplay();

      this.$store.commit("grid/activateModal", 0);
      this.$store.commit("grid/changeModalState", "player");
      this.$store.commit("grid/changeActiveFrame", "FilmModal");
    },
    deactivateReplay() {
      this.$emit("start-watching-next");
    },
    startTimer() {
      if (this.timeLeft > 0) {
        this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
      }
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

$film13-grid-bp: 1060px;
$film13-grid-bp-lg: 1600px;

$grid-bp: $film13-grid-bp;
$grid-bp-lg: $film13-grid-bp-lg;

@mixin unsetBtn() {
  background: transparent;
  font-size: 1em;
  letter-spacing: 0.03em;
  text-transform: none;
  padding: 0;
  color: $light;
  border: 0;
  &:not(:disabled):hover,
  &:hover {
    cursor: pointer;
    background: transparent;
    border: 0;
  }
}

// FILM TILE NAVIGATION
.film-tile-navigation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100%;
  position: relative;
  z-index: 999;
}

.film-tile-navigation {
  .text {
    @media (max-width: $bp-sm) and (orientation: portrait) {
      flex: 0 0 45%;
      height: unset;
    }
  }
  figure {
    width: 100%;
    @media (max-width: $bp-sm) and (orientation: portrait) {
      flex: 0 0 45%;
      height: unset;
      text-align: center;
    }

    @media (max-width: $bp-sm) and (orientation: landscape) {
      height: 150px;
      padding-top: 20px;
      img {
        object-fit: contain !important;
      }
    }

    // background: $dark;
    .placeholder {
      width: 100%;
      height: 24vw;
      @media (max-width: $bp-sm) {
        height: unset;
      }
    }
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .text {
    margin-top: $spacer;
    h2 {
      font-size: 1.1em;
    }
    h3 {
      font-size: 1em;
    }
  }

  // replay grid

  .replay-film13 {
    .film-tile-navigation {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      height: 100%;
      justify-content: center;
    }
  }

  .modal-navigation-container {
    width: 100%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    @media (max-width: $bp-sm) and (orientation: portrait) {
      padding-top: $spacer * 3;
      flex-direction: column;
    }
    position: relative;
    z-index: 999;
    .modal-navigation-item {
      flex: 0 0 50%;
      @media (min-width: $bp-sm) {
        padding: $spacer * 3;
      }
      display: flex;
      flex-direction: column-reverse;
      @media (max-width: $bp-sm) and (orientation: portrait) {
        flex-direction: row-reverse;
        padding: $spacer 0;
        align-items: center;
      }
      justify-content: center;
      background: transparent;
      transition: $transition;
      * {
        transition: 0.3s ease color;
      }
      img {
        opacity: 1;
        transition: 0.3s ease opacity;
      }
      &:hover {
        cursor: pointer;
        * {
          color: $gold;
        }
      }
    }

    .text {
      margin-top: $spacer * 3;
      @media (max-width: $bp-sm) and (orientation: portrait) {
        margin-top: 0;
        margin-left: $spacer;
      }
    }
    h3 {
      text-transform: none;
      letter-spacing: 0.03em;
    }
    img {
      max-width: 100%;
    }
  }

  .countdown button {
    @include unsetBtn;
    padding: $spacer * 3;
    padding-bottom: 0;
    color: rgba($light, 0.8);
    transition: $transition;
    &:hover {
      cursor: pointer;
      color: $gold;
    }
  }

  @media (max-height: 380px) and (orientation: landscape) {
    .modal-navigation-container {
      flex-direction: row;
      .modal-navigation-item {
        flex-direction: column-reverse;
        .image {
          flex: 125px;
          img {
            object-fit: contain;
          }
        }
      }
    }
  }
}
</style>

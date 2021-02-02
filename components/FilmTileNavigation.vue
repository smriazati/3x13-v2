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
      console.log("setting modal vals");
      this.$store.commit("grid/createPrevNextModalsForReplay");
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
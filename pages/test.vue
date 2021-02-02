<template>
  <div></div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  async asyncData({ store, $axios }) {
    const [aboutRes, filmsRes, creditsRes] = await Promise.all([
      $axios
        .get("https://www.ysdt.org/wp-json/wp/v2/3x13_general/?per_page=1")
        .then((res) => {
          store.commit("content/setAboutData", res.data);
          return { aboutApi: res.data[0] };
        }),
      $axios
        .get("https://www.ysdt.org/wp-json/wp/v2/3x13films/?per_page=12")
        .then((res) => {
          store.commit("content/setFilmData", res.data);
          return { filmsApi: res.data };
        }),
      $axios
        .get("https://www.ysdt.org/wp-json/wp/v2/3x13credits/?per_page=14")
        .then((res) => {
          store.commit("content/setCreditsData", res.data);
          return { creditsApi: res.data };
        }),
    ]);
  },
  data() {
    return {
      fullscreen: false,
      gridId: "495232585",
      gridLink: "https://vimeo.com/495232585/ed11198286",
      gridOptions: {
        controls: true,
        muted: true,
        autoplay: true,
      },
      isFilm13Playing: true,
    };
  },
  computed: {
    ...mapState({
      activeModal: (state) => state.grid.activeModal,
      previouslyActiveModal: (state) => state.grid.previouslyActiveModal,
    }),
    ...mapGetters({
      aboutData: "content/aboutData",
      filmData: "content/filmData",
    }),
  },
  methods: {
    changeFullscreen(fullscreen) {
      this.fullscreen = fullscreen;
      this.$store.commit("grid/changeFullscreen", fullscreen);
    },
    toggleFullscreen() {
      this.$refs.fullscreen.toggle(); // recommended
      this.$store.commit("grid/toggleFullscreen");
    },
    onFilm13Ended() {
      console.log("ended now");
      this.isFilm13ReplayActive = true;
    },
    onFilm13TimeUpdate(event, data, player) {
      // console.log("timeupdate");
      if (event.percent > 0.994) {
        this.pauseFilm13();
      }
    },
    pauseFilm13() {
      const ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      ref.pause();
      // this.muteFilm13Sfx();
      this.isFilm13Playing = false;
    },
  },
};
</script>
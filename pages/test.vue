<template>
  <div class="film13-grid-wrapper">
    <Film13MainNav />
    <div
      v-if="!isFilm13ReplayActive || !isFilm13RemoteHidden"
      class="film13-remote"
    >
      <Film13Remote
        @toggle-film13-playback="toggleFilm13Playback"
        @toggle-film13-audio="toggleFilm13Audio"
        @jump-film13-back="jumpFilm13Back"
        @jump-film13-forward="jumpFilm13Forward"
        @toggle-fullscreen="toggleFullscreen"
      />
    </div>
    <div ref="gridFilm13" class="grid-film13">
      <div class="background background-iframe film13-background">
        <div class="iframe-wrapper">
          <client-only>
            <div ref="film13Wrapper" class="film13-player-wrapper">
              <vimeo-player
                ref="film13"
                :video-url="gridLink"
                :video-id="null"
                :options="gridOptions"
                @ready="onFilm13Ready"
                @loaded="onFilm13Loaded"
                @timeupdate="onFilm13TimeUpdate"
                @ended="onFilm13Ended"
              >
              </vimeo-player>
            </div>
          </client-only>
        </div>
      </div>
      <div class="hover">
        <div
          :class="
            isHoverStopperOver
              ? 'hover-wrapper-overlay-exit'
              : 'hover-wrapper-overlay-enter'
          "
          class="hover-wrapper-overlay"
        ></div>
        <div class="hover-wrapper">
          <div
            v-for="(item, index) in filmData"
            :key="item.id"
            class="hover-item"
            @click="openFilmModal(index)"
            @mouseenter="playSfx(item.acf.film_order)"
          >
            <div class="hover-item-sound">
              <audio
                ref="sfx"
                :alt="item.acf.film_hover_sound.alt"
                :data-sfx-id="item.acf.film_order"
                @ended="onSfxEnding(item.acf.film_order)"
              >
                <source
                  :src="item.acf.film_hover_sound.url"
                  type="audio/mpeg"
                />
              </audio>
            </div>
            <div class="hover-item-text">
              <h2>{{ item.acf.artist_first_name }}</h2>
              <h3>{{ item.acf.artist_country }}</h3>
              <span class="icon"><SvgThing name="Play" /></span>
            </div>
            <div class="hover-item-darken"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
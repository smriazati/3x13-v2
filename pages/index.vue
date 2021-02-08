<template>
  <div class="container">
    <fullscreen
      ref="fullscreen"
      class="fullscreenWrapper"
      @change="changeFullscreen"
    >
      <div class="container-layer-stack">
        <div
          ref="introFrames"
          class="layer-stack layer-stack-intro-frames layer-stack-show-hide"
          :class="
            activeIntroSection != '' && activeIntroSection != undefined
              ? 'layer-stack-show'
              : 'layer-stack-hide'
          "
        >
          <div
            v-if="activeIntroSection != '' && activeIntroSection != undefined"
            class="close-button-container"
            @click="deactivateIntroSection"
          >
            <button class="close-button close-intro-frame-btn">
              <span class="visually-hidden">Close</span>
              <span class="icon"><SvgThing name="Close" /></span>
            </button>
          </div>
          <TutorialFrame
            v-if="activeIntroSection === 'Tutorial'"
            ref="tutorialSection"
            class="container-tutorial intro-frame tutorial-text section-show-hide"
            :class="
              activeIntroSection === 'Tutorial'
                ? 'section-show'
                : 'section-hide'
            "
            :active-intro-section="activeIntroSection"
          />
          <LazyAboutFrame
            v-if="activeIntroSection === 'About'"
            ref="aboutSection"
            class="container-about intro-frame section-show-hide"
            :class="
              activeIntroSection === 'About' ? 'section-show' : 'section-hide'
            "
            :active-intro-section="activeIntroSection"
          />
          <LazyCreditsFrame
            v-if="activeIntroSection === 'Credits'"
            ref="creditsSection"
            class="container-credits intro-frame section-show-hide"
            :class="
              activeIntroSection === 'Credits' ? 'section-show' : 'section-hide'
            "
            :active-intro-section="activeIntroSection"
          />
        </div>
        <div
          class="layer-stack layer-stack-intro"
          :class="
            activeFrame === frames[0]
              ? 'layer-stack-show'
              : 'layer-stack-hidden'
          "
        >
          <div
            v-if="filmData"
            class="container-poster-images video-grid-overlay"
          >
            <div class="hover">
              <div class="hover-wrapper">
                <div v-for="item in filmData" :key="item.id" class="hover-item">
                  <ImageLoader
                    :src="item.acf.film_poster_image.sizes.large"
                    :alt="item.acf.film_poster_image.alt"
                  />
                </div>
              </div>
            </div>
          </div>
          <main v-if="aboutData" class="container-intro">
            <header ref="header">
              <div class="text-wrapper">
                <h1 class="site-logo center">
                  {{ aboutData.acf.intro_headline }}
                </h1>
                <div class="site-tagline intro-body-text center">
                  <p>{{ aboutData.acf.intro_body_text }}</p>
                </div>
                <nav class="play-film13-button">
                  <button
                    ref="playBtn"
                    :disabled="!isFilm13Loaded"
                    @click="changeActiveFrame(frames[1])"
                  >
                    <span v-if="!isFilm13Loaded">Loading Film</span>
                    <span v-else>Enter Film</span>
                  </button>
                </nav>
                <div class="subtitle-controls center">
                  <h2 class="section-title">Subtitles</h2>
                  <VidSubtitles />
                </div>
              </div>
              <IntroSectionsNav
                :active-intro-section="activeIntroSection"
                class="hover-wrapper"
              />
            </header>
            <!-- /intro-sections -->
          </main>
        </div>
        <!-- end frame0-->
        <div
          class="layer-stack layer-stack-film13"
          :class="
            activeFrame === frames[1] || !isFilm13FrameHidden
              ? 'layer-stack-show'
              : 'layer-stack-hidden'
          "
        >
          <div class="film13-grid-wrapper">
            <Film13MainNav
              @mobile-menu-open="playFilm13"
              @mobile-menu-close="pauseFilm13"
            />
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
            <div class="container-film13">
              <div v-if="isFilm13ReplayActive" class="replay-film13">
                <FilmTileNavigation
                  :film13-replay="true"
                  :countdown-duration="15"
                  @start-watching-next="deactivateReplay()"
                />
                <div class="replay-button-container">
                  <button
                    class="replay button-icon button-small"
                    @click="replayFilm13()"
                  >
                    Replay Grid
                  </button>
                </div>
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
                      :key="index"
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
          </div>
        </div>
        <!-- end frame3 -->
        <div
          class="layer-stack layer-stack-film-modal"
          :class="
            activeFrame === frames[2]
              ? 'layer-stack-show'
              : 'layer-stack-hidden'
          "
        >
          <div
            v-if="filmData && activeFrame === frames[2]"
            class="container-filmmodal"
          >
            <div
              class="close-modal-container close-modal-overlay"
              @click="closeModal()"
            >
              <button class="close-modal-button">
                <span class="visually-hidden">Close</span>
                <span class="icon"><SvgThing name="Close" /></span>
              </button>
            </div>
            <div
              v-if="showModalPlayer"
              ref="filmModalWrapper"
              class="modal-grid-wrapper"
            >
              <div class="pagination-button-container pagination-button-prev">
                <button class="prev" @click="goToPrevModal()">
                  <div class="arrow">
                    <span class="visually-hidden">Previous</span>
                    <span class="icon"><SvgThing name="Prev" /></span>
                  </div>
                  <div class="text">
                    <h2>
                      {{ filmData[prevModal].acf.artist_first_name }}
                    </h2>
                    <h3>{{ filmData[prevModal].acf.artist_country }}</h3>
                  </div>
                </button>
              </div>
              <client-only>
                <div class="modal-player-wrapper iframe-wrapper">
                  <vimeo-player
                    ref="filmModal"
                    :video-id="null"
                    :options="modalOptions"
                    :video-url="filmData[activeModal].acf.vimeo_private_link"
                    @ready="onFilmModalReady"
                    @loaded="onFilmModalLoaded"
                    @texttrackchange="onFilmModalTextTrackUserChange"
                    @ended="onFilmModalEnded"
                  >
                  </vimeo-player>
                </div>
              </client-only>
              <div class="pagination-button-container pagination-button-next">
                <button class="next" @click="goToNextModal()">
                  <div class="arrow">
                    <span class="visually-hidden">Next</span>
                    <span class="icon"><SvgThing name="Next" /></span>
                  </div>
                  <div class="text">
                    <h2>
                      {{ filmData[nextModal].acf.artist_first_name }}
                    </h2>
                    <h3>{{ filmData[nextModal].acf.artist_country }}</h3>
                  </div>
                </button>
              </div>
            </div>
            <div
              v-if="activeModalState === 'tiles'"
              class="film-tile-navigation-container film13-grid-wrapper"
            >
              <FilmTileNavigation
                :countdown-duration="5"
                class="container-film13"
              />
            </div>
          </div>
        </div>
        <!-- end frame4 -->
      </div>
      <!-- end layer-stack-wrapper -->
    </fullscreen>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import FilmTileNavigation from "../components/FilmTileNavigation.vue";

export default {
  components: { FilmTileNavigation },
  layout: "default",
  async asyncData({ store, $axios }) {
    const [aboutRes, filmsRes, creditsRes] = await Promise.all([
      $axios.get("3x13_general/?per_page=1").then((res) => {
        store.commit("content/setAboutData", res.data);
        return { aboutApi: res.data[0] };
      }),
      $axios.get("3x13films/?per_page=12").then((res) => {
        store.commit("content/setFilmData", res.data);
        return { filmsApi: res.data };
      }),
      $axios.get("3x13credits/?per_page=14").then((res) => {
        store.commit("content/setCreditsData", res.data);
        return { creditsApi: res.data };
      }),
    ]);
  },
  data() {
    return {
      siteUrl: "https://3x13film.ysdt.org",
      gridOptions: {
        controls: false,
      },
      isFilm13Ready: false,
      isFilm13ReplayActive: false,
      isHoverStopperOver: false,
      isFilmModalEnded: false,
      fullscreen: false,
      isFilm13RemoteHidden: false,
      isFilm13Loaded: false,
      isFilm13FrameHidden: true,
    };
  },

  computed: {
    ...mapState({
      prevModal: (state) => state.grid.prevModal,
      nextModal: (state) => state.grid.nextModal,
      previouslyActiveModal: (state) => state.grid.previouslyActiveModal,
      frames: (state) => state.grid.frames,
      previousFrame: (state) => state.grid.previousFrame,
      activeFrame: (state) => state.grid.activeFrame,
      activeModalState: (state) => state.grid.activeModalState,
      activeSfx: (state) => state.sound.activeSfx,
      subtitleLanguage: (state) => state.grid.subtitleLanguage,
      isFilmDataLoaded: (state) => state.content.isFilmDataLoaded,
      isFilm13Playing: (state) => state.grid.isFilm13Playing,
      isFilm13Muted: (state) => state.grid.isFilm13Muted,
    }),
    ...mapGetters({
      aboutData: "content/aboutData",
      filmData: "content/filmData",
      gridLink: "content/gridLink",
    }),
    showModalPlayer: function () {
      if (this.activeModal >= 0 && this.activeModalState === "player") {
        return true;
      }
      return false;
    },
    activeModal: {
      get: function () {
        return this.$store.state.grid.activeModal;
      },
      set: function (payload) {
        this.$store.commit("grid/activateModal", payload);
      },
    },
    activeIntroSection: {
      get: function () {
        return this.$store.state.grid.activeIntroSection;
      },
      set: function (payload) {
        this.$store.commit("grid/activateIntroSection", payload);
      },
    },
    modalOptions() {
      let options;
      if (this.subtitleLanguage === "") {
        options = {
          controls: true,
          allowfullscreen: true,
        };
      } else {
        options = {
          controls: true,
          allowfullscreen: true,
          texttrack: this.subtitleLanguage,
        };
      }
      return options;
    },
  },
  watch: {
    activeFrame() {
      if (this.activeFrame === "Intro") {
        this.activateIntroFrame();
      }
      if (this.activeFrame === "About") {
        this.activateAboutFrame();
      }
      if (this.activeFrame === "Credits") {
        this.activateCreditsFrame();
      }
      if (this.activeFrame === "Film13") {
        this.activateFilm13Frame();
      }
      if (this.activeFrame === "FilmModal") {
        this.activateFilmModalFrame();
      }

      if (this.previousFrame === "Intro") {
        this.deactivateIntroFrame();
      }
      if (this.previousFrame === "About") {
        this.deactivateAboutFrame();
      }
      if (this.previousFrame === "Credits") {
        this.deactivateCreditsFrame();
      }
      if (this.previousFrame === "Film13" && this.isFilm13ReplayActive) {
        this.deactivateReplay();
      }
      if (this.previousFrame === "Film13" && this.activeFrame !== "FilmModal") {
        this.deactivateFilm13Frame();
      }
      if (this.activeFrame === "FilmModal" && this.previousFrame === "Film13") {
        this.isFilm13FrameHidden = false;
        this.pauseFilm13();
      }
      if (this.previousFrame === "FilmModal") {
        this.deactivateFilmModalFrame();
      }
    },
    activeIntroSection() {
      if (this.activeFrame === "Film13") {
        if (
          this.activeIntroSection === "About" ||
          this.activeIntroSection === "Credits" ||
          this.activeIntroSection === "Tutorial"
        ) {
          this.pauseFilm13();
        } else {
          this.playFilm13();
        }
      }
      if (
        this.activeIntroSection !== "" &&
        this.activeIntroSection !== undefined
      ) {
        console.log(window.innerWidth);
        if (window.innerWidth > 1060) {
          const delay = 300;
          setTimeout(() => this.setCloseBtnPosition(), delay);
        }
      }
    },
    activeModalState: function () {
      if (this.activeModalState === "switching" && this.activeModal >= 0) {
        const delay = 10;
        setTimeout(
          () => this.$store.commit("grid/changeModalState", "player"),
          delay
        );
      }
    },
    activeModal() {
      if (this.previouslyActiveModal >= 0) {
        this.modalToModalNav();
      }
    },
  },
  mounted() {
    if (this.$refs.sfx) {
      this.$refs.sfx.forEach((s) => {
        s.load();
      });
    }
  },
  methods: {
    setCloseBtnPosition() {
      const section = this.$refs.introFrames.querySelector("section");
      const closeBtn = this.$refs.introFrames.querySelector("button");
      const sectionTop = section.offsetTop;
      const sectionLeft = section.offsetWidth + section.offsetLeft - 1;
      closeBtn.style.top = `${sectionTop}px`;
      closeBtn.style.left = `${sectionLeft}px`;
    },
    modalToModalNav() {
      this.$store.commit("grid/changeModalState", "switching");
    },
    changeFullscreen(fullscreen) {
      this.fullscreen = fullscreen;
      this.$store.commit("grid/changeFullscreen", fullscreen);
    },
    toggleFullscreen() {
      this.$refs.fullscreen.toggle(); // recommended
      this.$store.commit("grid/toggleFullscreen");
    },
    hoverStopperExit() {
      this.isHoverStopperOver = true;
    },
    hoverStopperEnter() {
      this.isHoverStopperOver = false;
    },
    playSfx(order) {
      if (!this.isFilm13Muted) {
        if (!this.activeSfx) {
          // the first time
          this.playSound(order);
          this.$store.commit("sound/addSfx", order);
        } else if (!this.activeSfx.includes(order)) {
          this.$store.commit("sound/addSfx", order);
          this.playSound(order);
        }
      }
    },
    playSound(order) {
      // console.log(order);
      if (!this.isFilm13Muted) {
        this.$refs.sfx.forEach((s) => {
          if (parseInt(order) === parseInt(s.dataset.sfxId)) {
            // console.log(s)
            s.load();
            const delay = 300;
            setTimeout(() => s.play(), delay);
          }
        });
      }
    },
    onSfxEnding(order) {
      this.$store.commit("sound/removeSfx", order);
    },
    onFilm13Loaded() {
      this.isFilm13Loaded = true;
      // console.log("loaded");
    },
    onFilm13Ready() {
      // console.log("ready now");
    },
    onFilm13Playing() {
      // console.log("playing now");
    },
    onFilm13Ended() {
      // console.log("ended now");
      this.activateReplay();
    },
    replayFilm13() {
      console.log("replaying film 13");
      this.deactivateReplay();
      this.showFilm13Grid();
      this.hoverStopperExit();
      this.playFilm13FromStart();
    },
    activateReplay() {
      this.$store.commit("grid/createPrevNextModalsForReplay");
      this.isFilm13ReplayActive = true;
    },
    deactivateReplay() {
      this.isFilm13ReplayActive = false;
      this.setFilm13ToStart();
    },
    hideFilm13Grid() {
      const ref = this.$refs.gridFilm13;
      if (!ref) {
        return;
      }
      ref.classList.remove("showFilm13Grid");
      ref.classList.add("hideFilm13Grid");
    },
    showFilm13Grid() {
      const ref = this.$refs.gridFilm13;
      if (!ref) {
        return;
      }
      ref.classList.remove("hideFilm13Grid");
      ref.classList.add("showFilm13Grid");
    },
    onFilmModalTextTrackUserChange(event) {
      if (event.language) {
        this.$store.commit("grid/setSubtitle", event.language);
      } else {
        this.$store.commit("grid/deactivateSubtitle");
      }
    },
    onFilmModalLoaded() {
      const ref = this.$refs.filmModal;
      if (!ref) {
        return;
      }
      // console.log("modal loaded");
      const currentLang = this.subtitleLanguage;
      if (currentLang === "") {
        ref.play();
      } else {
        ref.player
          .enableTextTrack(currentLang)
          .then(function (track) {
            console.log("enabled the text");
            ref.play();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    onFilmModalReady() {
      this.playFilmModal();
    },
    onFilmModalEnded() {
      this.isFilmModalEnded = true;
      this.$store.commit("grid/changeModalState", "tiles");
    },
    closeModal() {
      this.changeActiveFrame(this.frames[1]);
      if (this.activeModalState === "tiles") {
        this.$store.commit("grid/changeModalState", "player");
      }
      if (this.isFilm13ReplayActive) {
        this.deactivateReplay();
        this.playFilm13FromStart();
      }
    },
    updateModalPlayer(id) {
      console.log("updating");
      const ref = this.$refs.filmModal;
      if (!ref) {
        return;
      }
      ref.update(id);
      this.playFilmModal();
    },
    goToPrevModal() {
      this.$store.commit("grid/activateModal", this.prevModal);
    },
    goToNextModal() {
      this.$store.commit("grid/activateModal", this.nextModal);
    },
    activateIntroSection(payload) {
      this.$store.commit("grid/activateIntroSection", payload);
      this.pauseFilm13();
    },
    deactivateIntroSection() {
      this.$store.commit("grid/activateIntroSection");
      if (this.activeFrame === "Film13") {
        this.playFilm13();
      }
    },
    openFilmModal(payload) {
      this.$store.commit("grid/activateModal", payload);
      if (
        this.activeModalState === "tiles" ||
        this.activeModalState === "switching"
      ) {
        this.$store.commit("grid/changeModalState", "player");
      }
      this.changeActiveFrame(this.frames[2]);
    },
    onFilm13TimeUpdate(event, data, player) {
      // console.log("timeupdate");
      if (this.isHoverStopperOver) {
        if (event.seconds > 180) {
          this.hoverStopperEnter();
        }
      }
      if (event.seconds > 195) {
        this.hideFilm13Remote();
      }
      if (event.seconds > 201) {
        this.pauseFilm13AtEnd();
      }
    },
    pauseFilm13AtEnd: function () {
      this.pauseFilm13();
      this.activateReplay();
    },
    hideFilm13Remote() {
      this.isFilm13RemoteHidden = true;
    },
    showFilm13Remote() {
      this.isFilm13RemoteHidden = false;
    },
    changeActiveFrame(frame) {
      this.$store.commit("grid/changeActiveFrame", frame);
    },
    activateIntroFrame() {},
    activateAboutFrame() {},
    activateCreditsFrame() {},
    activateFilm13Frame() {
      window.scroll({
        top: 0,
        left: 0,
      });
      this.hoverStopperExit();
      this.playFilm13();
    },
    showFilm13Frame() {
      this.hoverStopperExit();
    },
    activateFilmModalFrame(id) {
      this.playFilmModal();
    },
    deactivateIntroFrame() {
      this.activeIntroSection = null;
    },
    deactivateAboutFrame() {},
    deactivateCreditsFrame() {},
    deactivateFilm13Frame() {
      this.isFilm13FrameHidden = true;
      this.pauseFilm13();
    },
    deactivateFilmModalFrame() {
      this.activeModal = null;
      this.previousActiveModal = null;
      this.pauseFilmModal();
    },
    playFilmModal() {
      const ref = this.$refs.filmModal;
      if (!ref) {
        return;
      }
      const currentLang = this.$store.state.grid.subtitleLanguage;
      if (currentLang === "") {
        ref.play();
      } else {
        ref.player
          .enableTextTrack(currentLang)
          .then(function (track) {
            track.kind = "subtitles";
            ref.play();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    pauseFilmModal() {
      const ref = this.$refs.filmModal;
      if (!ref) {
        return;
      }
      ref.pause();
    },
    playFilm13() {
      const ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      ref.play();
      // if (!this.isFilm13Muted) {
      //   this.unmuteFilm13Sfx();
      // }
      this.$store.commit("grid/toggleFilm13Playback", true);
    },
    pauseFilm13() {
      const ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      console.log("pausing");
      ref.pause();
      // this.muteFilm13Sfx();
      this.$store.commit("grid/toggleFilm13Playback", false);
    },
    toggleFilm13Playback() {
      if (this.isFilm13Playing) {
        this.pauseFilm13();
      } else {
        this.playFilm13();
      }
    },
    toggleFilm13Audio() {
      if (this.isFilm13Muted) {
        this.unmuteFilm13();
        this.unmuteFilm13Sfx();
      } else {
        this.muteFilm13();
        this.muteFilm13Sfx();
      }
    },
    muteFilm13() {
      const ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      ref.mute();
      this.$store.commit("grid/toggleFilm13Audio", true);
      // this.isFilm13Muted = true;
    },
    unmuteFilm13() {
      const ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      ref.unmute();
      this.$store.commit("grid/toggleFilm13Audio", false);
    },
    muteFilm13Sfx() {
      const ref = this.$refs.sfx;
      if (!ref) {
        return;
      }
      ref.forEach((s) => {
        s.muted = true;
      });
    },
    unmuteFilm13Sfx() {
      const ref = this.$refs.sfx;
      if (!ref) {
        return;
      }
      ref.forEach((s) => {
        s.muted = false;
      });
    },
    setFilm13ToStart() {
      const ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      ref.player
        .setCurrentTime(0)
        .then((seconds) => {
          this.pauseFilm13();
          this.showFilm13Remote();
        })
        .catch(function (error) {
          console.log(`${ref} player time jump to start failed: ${error}`);
        });
    },
    playFilm13FromStart() {
      const ref = this.$refs.film13;

      if (!ref) {
        return;
      }
      ref.player
        .setCurrentTime(0)
        .then((seconds) => {
          this.playFilm13();
          this.showFilm13Remote();
        })
        .catch(function (error) {
          console.log(`${ref} player time jump/pause failed. error: ${error}`);
        });
    },
    jumpFilm13Back() {
      const ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      ref.player.getCurrentTime().then((seconds) => {
        const currentTime = seconds;
        const offset = 15;
        let jumpedTime;
        if (currentTime > offset) {
          jumpedTime = seconds - offset;
        } else {
          jumpedTime = 0;
        }
        ref.player
          .setCurrentTime(jumpedTime)
          .then((seconds) => {
            this.playFilm13();
          })
          .catch(function (error) {
            console.log(
              `${ref} player time jump/pause failed. error: ${error}`
            );
          });
      });
    },
    jumpFilm13Forward() {
      let ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      ref.player.getCurrentTime().then((seconds) => {
        const currentTime = seconds;
        const offset = 15;
        let jumpedTime = seconds + offset;
        // jumpedTime = 197;
        ref.player
          .setCurrentTime(jumpedTime)
          .then((seconds) => {
            this.playFilm13();
          })
          .catch(function (error) {
            console.log(
              `${ref} player time jump/pause failed. error: ${error}`
            );
          });
      });
    },
  },
  head() {
    return {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: this.aboutData.acf.seo_site_description,
        },
        // Twitter
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        { hid: "twitter:site", name: "twitter:site", content: "@nuxt_js" },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: this.siteUrl,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.aboutData.acf.seo_site_title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.aboutData.acf.seo_site_description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.aboutData.acf.seo_site_image.sizes.large,
        },

        // Open Graph
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: this.aboutData.acf.seo_site_title,
        },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: this.siteUrl,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.aboutData.acf.seo_site_title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.aboutData.acf.seo_site_description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.aboutData.acf.seo_site_image.sizes.large,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: this.siteUrl,
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: this.aboutData.acf.seo_site_image.alt,
        },
      ],
    };
  },
};
</script>
<template>
  <div class="container">
    <div class="container-layer-stack">
      <div
        class="layer-stack"
        :class="
          activeFrame === frames[0] ? 'layer-stack-show' : 'layer-stack-hidden'
        "
      >
        <div class="container-poster-images video-grid-overlay">
          <div class="hover">
            <div class="hover-wrapper">
              <div v-for="item in filmData" :key="item.id" class="hover-item">
                <img :src="item.acf.film_poster_image.sizes.medium" :alt="item.acf.film_poster_image.alt">
              </div>
            </div>
          </div>
        </div>
        <main class="container-intro"> 
          <header>
            <div class="text-wrapper">
              <h1 class="logo center">{{ aboutData.acf.intro_headline }}</h1>
              <div class="intro-body-text center">
                <p>{{ aboutData.acf.intro_body_text}}</p>
              </div>
              <nav>
                <button @click="changeActiveFrame(frames[1])" :disabled="!isFilmDataLoaded">Play Film</button>
              </nav>
              <div class="subtitle-controls center">
                <h2>Subtitles</h2>
                <VidSubtitles />
              </div>
              <div class="tutorial-text">
                <h2 class="center">{{ aboutData.acf.tutorial_headline}}</h2>
                <div v-html="aboutData.acf.tutorial_body_text"></div>
              </div>
            </div>
            <nav>
              <ul class="subtle-links">
                <li>
                  <button @click="activateIntroSection('About')">About</button>
                </li>
                <li>
                  <button @click="activateIntroSection('Credits')">Credits</button>
                </li>
              </ul>
            </nav>
          </header>
          <section
            class="container-about section-show-hide "
            :class="activeIntroSection === 'About' ? 'section-show' : 'section-hide' "
            > 
              <div class="text-wrapper">
                <h2>{{ aboutData.acf.about_headline }}</h2>
                <div class="about-body-text" v-html="aboutData.acf.about_body_text">
                </div>
                <div class="supporters">
                  <h3>{{ aboutData.acf.supporters_headline }}</h3>
                  <div class="supporters-text" v-html="aboutData.acf.supporters_body_text"></div>
                  <div class="supporters-gallery">
                    <ul>
                      <li v-for="item in aboutData.acf.supporters_logo_gallery" :key="item.ID" class="supporter-logo">
                        <img :src="item.sizes.medium" :alt="item.alt" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
          </section>
          <section
          class="container-credits section-show-hide "
          :class="
            activeIntroSection === 'Credits' ? 'section-show' : 'section-hide'
          "
        >
          <h2 class="center">Credits</h2>

          <div class="credits-section">
            <h3>{{ aboutData.acf.primary_credits_headline}}</h3>
            <ul class="credits-list">
              <li v-for="(item, index) in aboutData.acf.primary_credits_list" :key="index">
                <div v-if="item.link">
                  <CreditItem
                    :name="item.name"
                    :role="item.role"
                    :image="item.image.sizes.medium"
                    :image-alt="item.image.alt"
                    :bio="item.bio"
                    :link="item.link"
                  />
                </div>
                <div v-else>
                  <CreditItem
                    :name="item.name"
                    :role="item.role"
                    :image="item.image.sizes.medium"
                    :image-alt="item.image.alt"
                    :bio="item.bio"
                  />
                </div>
              </li>
            </ul>
          </div>


          <div class="credits-section">
            <h3>Artists</h3>
            <ul class="credits-list">
            <li v-for="(item, index) in artistCredits" :key="index">
                <div v-if="item.acf.artist_link">
                  <CreditItem
                    :name="item.acf.artist_full_name"
                    :role="item.acf.artist_full_location"
                    :image="item.acf.artist_image.sizes.medium"
                    :image-alt="item.acf.artist_image.alt"
                    :bio="item.acf.artist_bio"
                    :link="item.acf.artist_link"
                  />
                </div>
                <div v-else>
                  <CreditItem
                    :name="item.acf.artist_full_name"
                    :role="item.acf.artist_full_location"
                    :image="item.acf.artist_image.sizes.medium"
                    :image-alt="item.acf.artist_image.alt"
                    :bio="item.acf.artist_bio"
                  />
                </div>
              </li>
            </ul>
          </div>

          <div class="credits-section">
            <h3>{{ aboutData.acf.secondary_credits_headline}}</h3>
            <ul class="credits-list">
              <li v-for="(item, index) in aboutData.acf.secondary_credits_list" :key="index">
                <div v-if="item.link">
                  <CreditItem
                    :name="item.name"
                    :role="item.role"
                    :image="item.image.sizes.medium"
                    :image-alt="item.image.alt"
                    :bio="item.bio"
                    :link="item.link"
                  />
                </div>
                <div v-else>
                  <CreditItem
                    :name="item.name"
                    :role="item.role"
                    :image="item.image.sizes.medium"
                    :image-alt="item.image.alt"
                    :bio="item.bio"
                  />
                </div>
              </li>
            </ul>
          </div>  

          <div class="credits-section credits-no-image">
            <h3>{{ aboutData.acf.tertiary_credits_headline}}</h3>
            <ul class="credits-list">
              <li v-for="(item, index) in aboutData.acf.tertiary_credits_list" :key="index">
                <div v-if="item.link">
                  <CreditItem
                    :name="item.name"
                    :role="item.role"
                    :link="item.link"
                  />
                </div>
                <div v-else>
                  <CreditItem
                    :name="item.name"
                    :role="item.role"
                  />
                </div>
              </li>
            </ul>
          </div>         

        </section>
      </main>


        
      </div>
      <!-- end frame0-->
      <div
        class="layer-stack"
        :class="
          activeFrame === frames[1] ? 'layer-stack-show' : 'layer-stack-hidden'
        "
      >
        <div class="container-film13">
          <nav>
            <button 
              class="brand"
              @click="changeActiveFrame(frames[0])">3 x 13</button>
          </nav>

          <div class="film13-remote">
            <ul v-if="!isFilm13ReplayActive">
              <li>
                <div @click="toggleFilm13Playback()">
                  <span v-if="!isFilm13Playing">
                    <span class="visually-hidden">Play</span>
                    <span class="icon active"><SvgThing name="PlayPause" /></span>
                  </span>
                  <span v-else> 
                    <span class="visually-hidden">Pause</span>
                    <span class="icon"><SvgThing name="PlayPause" /></span>
                  </span>
                </div>
              </li>
              <li>
                <div @click="toggleFilm13Audio()">
                  <span v-if="!isFilm13Muted"> 
                    <span class="visually-hidden">Unmute sound</span>
                    <span class="icon"><SvgThing name="Mute" /></span>
                  </span>
                  <span v-else> 
                    <span class="visually-hidden"> Mute sound</span>
                    <span class="icon active"><SvgThing name="Mute" /></span>
                  </span>
                </div>
              </li>
              <li>
                <div @click="jumpFilm13Back()">
                  <span class="visually-hidden">Skip 15 Seconds Backward</span> 
                  <span class="icon"><SvgThing name="SkipBack" /></span>
                </div>
              </li>
              <li>
                <div @click="jumpFilm13Forward()">
                  <span class="visually-hidden">Skip 15 Seconds Forward</span>
                  <span class="icon"><SvgThing name="SkipForward" /></span>
                </div>
              </li>
            </ul>
            <ul v-else>
              <li>
                <button class="replay" @click="replayFilm13()">
                  <span class="visually-hidden">Watch again</span>
                  <span class="icon"><SvgThing name="Replay" /></span>
                </button>
              </li>
            </ul>
          </div>
          <div ref="gridFilm13" class="grid-film13">
            <div class="background">
              <div class="iframe-wrapper">
                <client-only>
                  <div ref="film13Wrapper" class="film13-player-wrapper">
                    <vimeo-player
                      ref="film13"
                      :video-id="gridId"
                      :options="gridOptions"
                      :video-url="gridLink"
                      @ended="onFilm13Ended"
                    >
                    </vimeo-player>
                  </div>
                </client-only>
              </div>
            </div>
            <div class="hover">
              <div class="hover-wrapper-overlay"></div>
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
                    @ended="onSfxEnding(item.acf.film_order)">
                      <source :src="item.acf.film_hover_sound.url" type="audio/mpeg" />
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
      <!-- end frame3 -->
      <div
        class="layer-stack"
        :class="
          activeFrame === frames[2] ? 'layer-stack-show' : 'layer-stack-hidden'
        "
      >
        <div 
          class="container-filmmodal"
          v-if="filmData && activeFrame === frames[2]">
          <!-- {{ activeModal }} -->
          <client-only>
            <div ref="filmModalWrapper" class="modal-player-wrapper">
              <vimeo-player
                ref="filmModal"
                :video-id="filmData[activeModal].acf.vimeo_id"
                :options="modalOptions"
                :video-url="filmData[activeModal].acf.vimeo_private_link"
                @ended="onFilmModalEnded"
              >
              </vimeo-player>
            </div>
          </client-only>
          <nav class="filmmodal-controls">
            <div class="close-modal">
              <button @click="closeModal()">
                <span class="visually-hidden">Close</span>
                <span class="icon active"><SvgThing name="Close" /></span>
              </button>
            </div>
            <div 
              class="pagination-button pagination-button-prev"
              @click="goToPrevModal()"
              >
              <button class="pagination-label">
                <span class="visually-hidden">Previous</span>
                <span class="icon"><SvgThing name="Prev" /></span>
              </button>
              <span class="pagination-info">
                <h2>{{ filmData[paginationPrevModal].acf.artist_first_name}}</h2>
                <h3>{{ filmData[paginationPrevModal].acf.artist_country}}</h3>
                <img :src="filmData[paginationPrevModal].acf.film_poster_image.sizes.medium" :alt="filmData[paginationPrevModal].acf.film_poster_image.alt">
              </span>
            </div>
            <div 
              class="pagination-button pagination-button-next"
              @click="goToNextModal()"
              >
              <button class="pagination-label">
                <span class="visually-hidden">Next</span>
                <span class="icon"><SvgThing name="Next" /></span>
              </button>
              <span class="pagination-info">
                <h2>{{ filmData[paginationNextModal].acf.artist_first_name}}</h2>
                <h3>{{ filmData[paginationNextModal].acf.artist_country}}</h3>
                <img :src="filmData[paginationNextModal].acf.film_poster_image.sizes.medium" :alt="filmData[paginationNextModal].acf.film_poster_image.alt">
              </span>
            </div>
            <div v-if="showCountdown" class="countdown">Continue</div>
          </nav>
        </div>
      </div>
      <!-- end frame4 -->
    </div>
    <!-- end layer-stack-wrapper -->
  </div>
</template>

<script>
import CreditItem from "@/components/CreditItem.vue";
import VidSubtitles from "@/components/VidSubtitles.vue";
import SvgThing from "@/components/SvgThing.vue";

export default {
  layout: "default",
  components: {
    SvgThing,
    VidSubtitles,
    CreditItem
  },
  async asyncData ({ store, $axios }) {
      const [aboutRes, filmsRes] = await Promise.all([ 
          $axios.get('https://www.ysdt.org/wp-json/wp/v2/3x13_general/?per_page=1'),
          $axios.get('https://www.ysdt.org/wp-json/wp/v2/3x13films/?per_page=12')
      ])

      // store.commit("content/setAboutData", aboutRes.data);
      // store.commit("content/setFilmsData", filmRes.data);

      return {
          aboutApi: aboutRes.data[0],
          filmsApi: filmsRes.data,
      }
  },
  data() {
    return {
      gridId: "495232585",
      gridLink: "https://vimeo.com/495232585/ed11198286",
      gridOptions: {
        controls: false,
      },
      modalId: "495232585",
      modalLink: "https://vimeo.com/495232585/ed11198286",
      isFilm13Ready: false,
      isFilm13Playing: false,
      isFilm13Muted: false,
      frames: ["Intro", "Film13", "FilmModal"],
      previousFrame: null,
      activeFrame: "Intro",
      previousActiveModal: null,
      activeModal: null,
      activeIntroSection: null,
      showCountdown: false,
      isFilm13ReplayActive: false
    };
  },

  computed: {
    activeSfx() {
      return this.$store.state.sound.activeSfx;
    },
    modalOptions() {
      let options = {
        controls: true,
        autoplay: true,
        texttrack: this.$store.state.grid.subtitleLanguage,
      }
      return options;
    },
    isFilmDataLoaded() {
      if (this.filmsApi) {
        return true;
      } else {
        return false;
      }
    },
    aboutData() {
      if (!this.aboutApi) {
        return false;
      }
      return this.aboutApi
    },
    filmData() {
      if (!this.isFilmDataLoaded) {
        return false;
      }

      var ref = this.filmsApi.slice();
      // ref.sort((a, b) => parseFloat(a.acf.film_order) - parseFloat(b.acf.film_order));

      ref.sort(function(a, b) {
        return parseFloat(a.acf.film_order) - parseFloat(b.acf.film_order);
      })

      return ref;
    },
    artistCredits() {
        var ref2 = this.filmsApi.slice();

        ref2.sort(function(a, b) {
            return a.acf.artist_first_name.localeCompare(b.acf.artist_first_name);
        });

        return ref2;
    },
    paginationPrevModal() {
      if (this.activeModal === null) {
        return null;
      }

      if (this.activeModal === 0) {
        return 11;
      } else {
        return this.activeModal - 1;
      }
    },
    paginationNextModal() {
      if (this.activeModal === null) {
        return null;
      }
      if (this.activeModal === 11) {
        return 0;
      } else {
        return this.activeModal + 1;
      }
    }
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
      if (this.previousFrame === "Film13") {
        this.deactivateFilm13Frame();
      }
      if (this.previousFrame === "FilmModal") {
        this.deactivateFilmModalFrame();
      }
    },
  },
  methods: {
    playSfx(order) {
      if (!this.activeSfx) {
        // the first time
        this.playSound(order);
        this.$store.commit("sound/addSfx", order);
      } else if (!this.activeSfx.includes(order)) {
        this.$store.commit("sound/addSfx", order);
        this.playSound(order);
      }
    },
    playSound(order) {
      // console.log(order);
      this.$refs.sfx.forEach((s) => {
        if (parseInt(order) === parseInt(s.dataset.sfxId)) {
          // console.log(s)
          s.load();
          s.play();
        }
      });
    },
    onSfxEnding(order) {
      this.$store.commit("sound/removeSfx", order);
    },
    onFilm13Ended() {
      console.log('ended now')
      this.hideFilm13Grid();
      this.isFilm13ReplayActive = true;
    },
    replayFilm13() {
      this.isFilm13ReplayActive = false;
      this.showFilm13Grid();
      this.playFilm13FromStart();
    },
    hideFilm13Grid() {
      const ref = this.$refs.gridFilm13;
      if (!ref) {
        return;
      }
      ref.classList.remove('showFilm13Grid')
      ref.classList.add('hideFilm13Grid')
    },
    showFilm13Grid() {
      const ref = this.$refs.gridFilm13;
      if (!ref) {
        return;
      }
      ref.classList.remove('hideFilm13Grid')
      ref.classList.add('showFilm13Grid')
    },
    hideModalPlayer() {
      const ref = this.$refs.filmModalWrapper;
      if (!ref) {
        return;
      }
      ref.classList.remove('showModalPlayer')
      ref.classList.add('hideModalPlayer')
    },
    showModalPlayer() {
      const ref = this.$refs.filmModalWrapper;
      if (!ref) {
        return;
      }
      ref.classList.remove('hideModalPlayer')
      ref.classList.add('showModalPlayer')
    },
    activateCountdown() {
      this.showCountdown = true;
    },
    deactivateCountdown() {
      this.showCountdown = false;
    },
    onFilmModalEnded() {
      // console.log('ended')
      this.activateCountdown();
      this.hideModalPlayer();
      const delay = 5000; // 5 seconds
      setTimeout(() => this.goToNextModal(), delay);
    },
    closeModal() {
      this.changeActiveFrame(this.frames[1]);
    },
    goToPrevModal() {
      this.deactivateCountdown();
      this.previousActiveModal = this.activeModal;
      this.activeModal = this.paginationPrevModal;
    },
    goToNextModal() {
      this.deactivateCountdown();
      this.showModalPlayer();
      this.previousActiveModal = this.activeModal;
      this.activeModal = this.paginationNextModal;
    },
    activateIntroSection(section) {
      this.activeIntroSection = section;
    },
    openFilmModal(id) {
      this.activeModal = id;
      this.changeActiveFrame(this.frames[2]);
      this.playFilmModal();
    },
    onFilm13TimeUpdate(event, data, player) {
      console.log("timeupdate");
      if (!this.isFilm13Playing) {
        this.isFilm13Playing = true;
      }
    },
    changeActiveFrame(frame) {
      this.previousFrame = this.activeFrame;
      this.activeFrame = frame;
    },
    activateIntroFrame() {},
    activateAboutFrame() {},
    activateCreditsFrame() {},
    activateFilm13Frame() {
      this.unmuteFilm13();
      this.playFilm13();
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
      this.muteFilm13();
      this.pauseFilm13();
    },
    deactivateFilmModalFrame() {
      this.activeModal = null;
      this.previousActiveModal = null;
      this.deactivateCountdown();
      this.pauseFilmModal();
      this.deactivateCountdown();
    },
    toggleFilm13Playback() {
      if (this.isFilm13Playing) {
        this.pauseFilm13();
      } else {
        this.playFilm13();
      }
    },
    playFilmModal() {
      const ref = this.$refs.filmModal;
      if (!ref) {
        return;
      }
      ref.play();
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
      this.unmuteFilm13Sfx();
      this.isFilm13Playing = true;
    },
    pauseFilm13() {
      const ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      ref.pause();
      this.muteFilm13Sfx();
      this.isFilm13Playing = false;
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
      this.isFilm13Muted = true;
    },
    unmuteFilm13() {
      const ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      ref.unmute();
      this.isFilm13Muted = false;
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
    playFilm13FromStart() {
      const ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      ref.player
        .setCurrentTime(0)
        .then((seconds) => {
          this.playFilm13();
        })
        .catch(function (error) {
          console.log(
            `${ref} player time jump/pause failed. error: ${error}`
          );
        });
    },
    jumpFilm13Back() {
      const ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      // // first, pause vid if its not already
      // if (this.isFilm13Playing) {
      //   this.pauseFilm13();
      // }

      // get currentTime and subtract interval
      ref.player.getCurrentTime().then((seconds) => {
        const currentTime = seconds;
        const offset = 15;
        let jumpedTime;
        if (currentTime > offset) {
          jumpedTime = seconds - offset;
        } else {
          jumpedTime = 0;
        }

        // console.log(jumpedTime);

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

      // first, pause vid if its not already
      // if (this.isFilm13Playing) {
      //   this.pauseFilm13();
      // }

      // get currentTime and subtract interval
      ref.player.getCurrentTime().then((seconds) => {
        const currentTime = seconds;
        const offset = 15;
        let jumpedTime = seconds + offset;

        // console.log(jumpedTime);

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
    }
  },
  mounted() {
    this.$refs.sfx.forEach((s) => {
      s.load();
    });
  }
};
</script>


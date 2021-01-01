<template>
  <div class="container2 container">
    <div class="container-layer-stack">
      <div
        class="container-intro layer-stack"
        :class="
          activeFrame === frames[0] ? 'layer-stack-show' : 'layer-stack-hidden'
        "
      >
        Intro
        <ul>
          <li>
            <button @click="changeActiveFrame(frames[1])">Film13</button>
          </li>
          <li><button @click="activateIntroSection('About')">About</button></li>
          <li>
            <button @click="activateIntroSection('Credits')">Credits</button>
          </li>
        </ul>

        <div
          class="container-about"
          :class="
            activeIntroSection === 'About' ? 'section-show' : 'section-hide'
          "
        >
          About
        </div>

        <div
          class="container-credits"
          :class="
            activeIntroSection === 'Credits' ? 'section-show' : 'section-hide'
          "
        >
          Credits
          <CreditItem Name="Firstname Lastname" Role="Role" Image="img.jpg" ImageAlt="alt text" Bio="bio bio" />
          <CreditItem Name="Firstname Lastname" Role="Role" Image="img.jpg" ImageAlt="alt text" />
          <CreditItem Name="Firstname Lastname" Role="Role" Image="img.jpg" ImageAlt="alt text" Bio="bio bio" />
          
        </div>
      </div>
      <!-- end frame0-->
      <div
        class="container-film13 layer-stack"
        :class="
          activeFrame === frames[1] ? 'layer-stack-show' : 'layer-stack-hidden'
        "
      >
        <div class="film13">
          <button @click="changeActiveFrame(frames[0])">Intro</button>

          <div class="film13-remote">
            <ul>
              <li>
                <button @click="toggleFilm13Playback()">
                  <span v-if="!isFilm13Playing"> Play </span>
                  <span v-else> Pause </span>
                </button>
              </li>
              <li>
                <button @click="jumpFilm13Back()">
                  Skip 15 Seconds Backwards
                </button>
              </li>
              <li>
                <button @click="jumpFilm13Forward()">
                  Skip 15 Seconds Forwards
                </button>
              </li>
              <li>
                <button @click="toggleFilm13Audio()">
                  <span v-if="!isFilm13Muted"> Mute sound </span>
                  <span v-else> Unmute sound </span>
                </button>
              </li>
            </ul>
          </div>
          <div class="grid-film13">
            <div class="background">
              <div class="iframe-wrapper">
                <client-only>
                  <vimeo-player
                    ref="film13"
                    :video-id="gridId"
                    :options="gridOptions"
                    :video-url="gridLink"
                  >
                  </vimeo-player>
                </client-only>
              </div>
            </div>
            <div class="hover">
              <div class="hover-item" @click="openFilmModal(0)"></div>
              <div class="hover-item" @click="openFilmModal(1)"></div>
              <div class="hover-item" @click="openFilmModal(2)"></div>
              <div class="hover-item" @click="openFilmModal(3)"></div>
              <div class="hover-item" @click="openFilmModal(4)"></div>
              <div class="hover-item" @click="openFilmModal(5)"></div>
              <div class="hover-item" @click="openFilmModal(6)"></div>
              <div class="hover-item" @click="openFilmModal(7)"></div>
              <div class="hover-item" @click="openFilmModal(8)"></div>
              <div class="hover-item" @click="openFilmModal(9)"></div>
              <div class="hover-item" @click="openFilmModal(10)"></div>
              <div class="hover-item" @click="openFilmModal(11)"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- end frame3 -->
      <div
        class="container-filmmodal layer-stack"
        :class="
          activeFrame === frames[2] ? 'layer-stack-show' : 'layer-stack-hidden'
        "
      > 
      <div v-if="testData && activeFrame === frames[2]">
        {{ activeModal }} 
        <client-only>
          <vimeo-player
            ref="filmModal"
            :video-id="testData[activeModal].fields.VideoID"
            :options="modalOptions"
            :video-url="testData[activeModal].fields.PrivateLink"
            @ended="onFilmModalEnded"
          >
          </vimeo-player>
        </client-only>
        <div class="filmmodal-controls">
          <button @click="closeModal()">Close</button>
          <button @click="goToPrevModal()">Previous</button>
          <button @click="goToNextModal()">Next</button>
          <div 
            v-if="showCountdown"
            class="countdown">
          </div>
        </div>
      </div>
      </div>
      <!-- end frame4 -->
    </div>
    <!-- end layer-stack-wrapper -->
  </div>
</template>

<script>
import CreditItem from '@/components/CreditItem.vue'

export default {
  layout: "default",
  components: {
    CreditItem
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
      modalOptions: {
        controls: true,
        autoplay: true
      },
      isFilm13Ready: false,
      isFilm13Playing: false,
      isFilm13Muted: false,
      frames: ["Intro", "Film13", "FilmModal"],
      previousFrame: null,
      activeFrame: "Intro",
      previousModal: null,
      activeModal: null,
      activeIntroSection: null,
      showCountdown: false
    };
  },
  computed: {
    testData() {
      if (!this.$store.state.content.testData) {
        return false;
      }

      if (!this.$store.state.content.testData[0].fields) {
        return false;
      }

      return this.$store.state.content.testData;
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
    activateCountdown() {
      this.showCountdown = true;
    },
    deactivateCountdown() {
      this.showCountdown = false;
    },
    onFilmModalEnded() {
      // console.log('ended')
      this.activateCountdown();
      const delay = 5000; // 5 seconds
      setTimeout(() => this.goToNextModal(), delay);
    },
    closeModal() {
      this.deactivateCountdown();
      this.changeActiveFrame(this.frames[1]);
    },
    goToPrevModal() {
      this.deactivateCountdown();
      this.previousModal = this.activeModal;
      if (this.previousModal === 0) {
        this.activeModal = 11;
      } else {
        this.activeModal = this.previousModal - 1;
      }
    },
    goToNextModal() {
      this.deactivateCountdown();
      this.previousModal = this.activeModal;
      if (this.previousModal === 11) {
        this.activeModal = 0;
      } else {
        this.activeModal = this.previousModal + 1;
      }
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
      this.previousModal = null;
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
      this.isFilm13Playing = true;
    },
    pauseFilm13() {
      const ref = this.$refs.film13;
      if (!ref) {
        return;
      }
      ref.pause();
      this.isFilm13Playing = false;
    },
    toggleFilm13Audio() {
      if (this.isFilm13Muted) {
        this.unmuteFilm13();
      } else {
        this.muteFilm13();
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
    },
  },
};
</script>


<template>
  <ul>
    <li>
      <div @click="toggleFilm13Playback()">
        <span v-if="!isFilm13Playing">
          <span class="visually-hidden">Play</span>
          <span class="icon active">
            <SvgThing name="PlayPause" />
          </span>
        </span>
        <span v-else>
          <span class="visually-hidden">Pause</span>
          <span class="icon"><SvgThing name="PlayPause" /></span>
        </span>
      </div>
    </li>
    <li>
      <div @click="jumpFilm13Back()">
        <span class="visually-hidden">Jump Backward</span>
        <span class="icon"><SvgThing name="SkipBack" /></span>
      </div>
    </li>
    <li>
      <div @click="jumpFilm13Forward()">
        <span class="visually-hidden">Jump Forward</span>
        <span class="icon"><SvgThing name="SkipForward" /></span>
      </div>
    </li>
    <li class="fullscreen-btn">
      <div @click="toggleFullscreen()">
        <span v-if="!fullscreen">
          <span class="visually-hidden">Open Fullscreen</span>
          <span class="icon">
            <SvgThing name="FullscreenOpen" />
          </span>
        </span>
        <span v-else>
          <span class="visually-hidden">Close Fullscreen</span>
          <span class="icon active">
            <SvgThing name="FullscreenClose" />
          </span>
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
  </ul>
</template>


<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      // activeModal: (state) => state.grid.activeModal,
      isFilm13Playing: (state) => state.grid.isFilm13Playing,
      fullscreen: (state) => state.grid.isFullscreen,
      isFilm13Muted: (state) => state.grid.isFilm13Muted,
    }),
  },
  methods: {
    toggleFilm13Playback: function () {
      this.$emit("toggle-film13-playback");
    },
    toggleFilm13Audio: function () {
      this.$emit("toggle-film13-audio");
    },
    jumpFilm13Back: function () {
      this.$emit("jump-film13-back");
    },
    jumpFilm13Forward: function () {
      this.$emit("jump-film13-forward");
    },
    toggleFullscreen: function () {
      this.$emit("toggle-fullscreen");
    },
  },
};
</script>
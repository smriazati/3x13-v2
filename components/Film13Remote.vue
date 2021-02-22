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

<style lang="scss">
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

$remoteIconWidth: 22px;
$remoteIconPadding: 11px;

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

@mixin unsetUl {
  list-style: none;
  padding-left: 0;
}

.film13-remote {
  padding: $spacer/2 $spacer * 2;
  @media (max-width: $bp-sm) {
    left: 0;
    top: 80px;
    width: 100%;
  }

  button {
    @include unsetBtn;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    // width: $remoteIconWidth*3 + $remoteIconPadding*6.1;
    > * {
      flex: 0 0 $remoteIconWidth + $remoteIconPadding;
      padding: $remoteIconPadding/2;
      // border: 1px solid $white;
      svg {
        width: $remoteIconWidth;
        height: $spacer * 3;
      }
      &:hover {
        cursor: pointer;
      }

      .icon {
        * {
          fill: rgba($light, 0.6) !important;
        }
        &:hover * {
          fill: rgba($light, 1) !important;
        }
        &.active * {
          fill: $gold !important;
        }
      }
    }
    list-style: none;
  }
}
</style>
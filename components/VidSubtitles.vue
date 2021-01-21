<template>
  <ul class="subtitles">
    <li
      :class="activeSubtitle === 'en' ? 'active-sub' : 'inactive-sub'"
      @click="subtitleChange('en')"
    >
      English
    </li>
    <li
      :class="activeSubtitle === 'ar' ? 'active-sub' : 'inactive-sub'"
      @click="subtitleChange('ar')"
    >
      عربى
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      activeSubtitle: "en",
    };
  },
  methods: {
    subtitleChange(payload) {
      this.$store.commit("grid/setSubtitle", payload);
      this.activeSubtitle = payload;
    },
  },
};
</script>

<style lang="scss">
$spacer: 10px;

$gold: rgb(202, 166, 17);
$dark: rgb(12, 11, 11);
$light: rgb(232, 232, 232);
$gray: rgb(44, 44, 44);

.subtitles ul {
  justify-content: flex-start;
  > li {
    margin-right: $spacer * 3;
    &:last-child {
      margin-right: 0;
    }
  }
}

.subtitles {
  ul {
    margin-top: $spacer;
    display: flex;
    padding: 0;
    list-style: none;
    justify-content: space-between;
    li {
      &.active-sub {
        color: $gold;
      }
      &:hover {
        cursor: pointer;
        color: $gold;
      }
    }
  }
}
</style>
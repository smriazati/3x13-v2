<template>
  <li
    v-if="item.acf"
    ref="itemTop"
    :class="isCollapsed ? 'accordion-collapsed' : 'accordion-open'"
    class="credit-component accordion"
  >
    <div
      v-if="type === 'secondary'"
      class="credit-item-header credit-item-visible"
    >
      <div :class="type" class="credit-item-header-text">
        <h2 v-if="item.acf.credit_name" class="name">
          <span v-if="item.acf.credit_website">
            <a :href="item.acf.credit_website" target="_blank">{{
              item.acf.credit_name
            }}</a>
          </span>
          <span v-else> {{ item.acf.credit_name }}</span>
        </h2>
        <h3 v-if="item.acf.credit_role" class="role">
          {{ item.acf.credit_role }}
        </h3>
        <p v-if="item.acf.credit_location" class="location">
          {{ item.acf.credit_location }}
        </p>
      </div>
    </div>

    <div
      v-if="type === 'primary'"
      class="credit-item-header credit-item-visible"
      @click="toggleFilmmakerCollapse"
    >
      <span class="icon back-button"><SvgThing name="Prev" /></span>
      <figure v-if="item.acf.credit_image" class="credit-item-image">
        <ImageLoader
          :src="item.acf.credit_image.sizes.medium"
          :alt="item.acf.credit_image.alt"
        />
      </figure>
      <div :class="type" class="credit-item-header-text">
        <h2 v-if="item.acf.credit_name" class="name">
          {{ item.acf.credit_name }}
        </h2>
        <h3 v-if="item.acf.credit_role" class="role">
          {{ item.acf.credit_role }}
        </h3>
      </div>
    </div>
    <div
      v-if="item.acf.credit_bio"
      class="credit-item-hidden credit-item-bio collapse"
      :class="isCollapsed ? 'collapse-hide' : 'collapse-show'"
    >
      <div class="credit-item-bio collapse-area">
        <div v-html="item.acf.credit_bio"></div>
        <span v-if="item.acf.credit_website">
          <a :href="item.acf.credit_website" target="_blank">(icon)</a>
        </span>
      </div>
    </div>

    <div
      v-if="type === 'artist'"
      class="credit-item-header credit-item-visible"
      @click="toggleArtistCollapse"
    >
      <span class="icon back-button"><SvgThing name="Prev" /></span>
      <figure v-if="item.acf.artist_image" class="credit-item-image">
        <ImageLoader
          :src="item.acf.artist_image.sizes.medium"
          :alt="item.acf.artist_image.alt"
        />
      </figure>
      <div :class="type" class="credit-item-header-text">
        <h2 v-if="item.acf.artist_full_name" class="name">
          {{ item.acf.artist_full_name }}
        </h2>
        <h3 v-if="item.acf.artist_full_location" class="role">
          {{ item.acf.artist_full_location }}
        </h3>
      </div>
    </div>
    <div
      v-if="item.acf.artist_bio"
      class="credit-item-hidden credit-item-bio collapse"
      :class="isCollapsed ? 'collapse-hide' : 'collapse-show'"
    >
      <div class="credit-item-bio collapse-area">
        <div v-html="item.acf.artist_bio"></div>
        <span v-if="item.acf.artist_link">
          <a :href="item.acf.artist_link" target="_blank">(icon)</a>
        </span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
    type: String,
  },
  data() {
    return {
      isCollapsed: true,
    };
  },
  methods: {
    toggleArtistCollapse() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit("on-artist-accordion-toggle", this);
    },
    toggleFilmmakerCollapse() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit("on-filmmaker-accordion-toggle", this);
    },
  },
};
</script>

<style lang="scss">
.credit-item-bio * {
  display: inline;
}
</style>

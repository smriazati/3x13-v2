<template>
  <div class="credit-component accordion">
    <figure v-if="image" class="credit-image">
      <img :src="image" :alt="imageAlt" />
    </figure>
    <div class="credit-text">
      <h2 class="name">
          {{ name }}
      </h2>
      <h3 class="role">{{ role }}</h3>
      <div class="bio collapse">
        <div 
            v-if="bio" 
            :class="isCollapsed ? 'closed-collapse' : 'open-collapse' "
            class="link-hover collapse-button" 
            @click="toggleCollapse()">
          <!-- <span v-if="isCollapsed"> Bio </span>
          <span v-else>
            <span class="visually-hidden">Close</span>
            <span class="icon"><SvgThing name="Close" /></span>
          </span> -->
          Bio
        </div>
        <div class="link link-hover">
          <a v-if="link" :href="link" target="_blank">
            Website
          </a>
        </div>
        <div
           v-if="bio" 
          :class="isCollapsed ? 'collapse-hide' : 'collapse-show'"
          class="collapse-area"
        >
          <div v-html="bio"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgThing from "@/components/SvgThing.vue";

export default {
  components: {
    // SvgThing,
  },
   props: {
    name: String,
    role: String,
    link: String,
    bio: String,
    image: String,
    imageAlt: String
  },
  data() {
    return {
      isCollapsed: true,
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>
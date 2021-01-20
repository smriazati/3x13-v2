<template>
  <div class="credit-component accordion">
    <h2>{{ name }}</h2>
    <h3>{{ role }}</h3>
    <p v-if="link"><a target="_blank" :href="link">Link</a></p>
    <figure v-if="image">
        <img :src="image" :alt="imageAlt">
    </figure>
    <div v-if="bio" class="collapse" @click="toggleCollapse()">
        <div class="link-hover collapse-button">
            Open Bio
        </div>
        <div
            :class="isCollapsed ? 'collapse-hide' : 'collapse-show'" 
            class="collapse-area">
            <div v-html="bio"></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: [
        "name", "role", "link", "bio", "image", "imageAlt"
    ],
    data() {
        return {
            isCollapsed: true,
        }
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        }
    }
};
</script>
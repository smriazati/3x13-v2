<template>
  <div class="credit-component accordion">
    <h2>{{ Name }}</h2>
    <h3>{{ Role }}</h3>
    <p><a target="_blank" :href="Link">Link</a></p>
    <figure>
        <img :src="Image" :alt="ImageAlt">
    </figure>
    <div v-if="Bio" class="collapse" @click="toggleCollapse()">
        <div class="collapse-button">
            Open Bio
        </div>
        <div
            :class="isCollapsed ? 'collapse-hide' : 'collapse-show'" 
            class="collapse-area">
            <p>{{ Bio }}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: [
        "Name", "Role", "Link", "Bio", "Image", "ImageAlt"
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
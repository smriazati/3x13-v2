<template>
  <div class="credit-component accordion">
    <figure v-if="image">
        <img :src="image" :alt="imageAlt">
    </figure>
    <h2 class="name">
        <a v-if="link" :href="link" target="_blank" >
            {{ name }}
        </a>
        <span v-else>
            {{ name }}
        </span>
    </h2>
    <h3 class="role">{{ role }}</h3>
    <div v-if="bio" class="bio collapse">
        <div class="link-hover collapse-button" @click="toggleCollapse()">
            <span v-if="isCollapsed">
                Bio
                <span class="icon"><SvgThing name="Next" /></span>
            </span>
            <span v-else>
                <span class="visually-hidden">Close</span>
                <span class="icon"><SvgThing name="Close" /></span>
            </span>
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
import SvgThing from "@/components/SvgThing.vue";

export default {
    components: {
        SvgThing
    },
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
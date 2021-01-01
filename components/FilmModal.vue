<template>
  <div class="filmmodal-component">

  </div>
</template>

<script>
export default {
    props: [
        // "Name", "Role", "Link", "Bio", "Image", "ImageAlt"
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
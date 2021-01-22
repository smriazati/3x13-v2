<template>
   <component :is="src"></component>
</template>
<script>
export default {
    name: 'Icon',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    computed: {
        src() {
            const src = require(`assets/icons/${this.name}.svg?inline`)
            return src
        }
    }
}
</script>

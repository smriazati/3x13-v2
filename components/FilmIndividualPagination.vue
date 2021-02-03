<template>
  <nav class="film-individual-pagination"></nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState({
      activeModal: (state) => state.grid.activeModal,
      prevModal: (state) => state.grid.prevModal,
      nextModal: (state) => state.grid.nextModal,
    }),
    ...mapGetters({
      filmData: "content/filmData",
    }),
  },
  methods: {
    goToPrevModal() {
      this.$store.commit("grid/activateModal", this.prevModal);
    },
    goToNextModal() {
      this.$store.commit("grid/activateModal", this.nextModal);
    },
  },
};
</script>
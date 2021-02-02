<template>
  <nav class="film-individual-pagination">
    <button class="prev" @click="goToPrevModal()">
      <div class="arrow">
        <span class="visually-hidden">Previous</span>
        <span class="icon"><SvgThing name="Prev" /></span>
      </div>
      <div class="text">
        <h2>
          {{ filmData[prevModal].acf.artist_first_name }}
        </h2>
        <h3>{{ filmData[prevModal].acf.artist_country }}</h3>
      </div>
    </button>

    <button class="next" @click="goToNextModal()">
      <div class="arrow">
        <span class="visually-hidden">Next</span>
        <span class="icon"><SvgThing name="Next" /></span>
      </div>
      <div class="text">
        <h2>
          {{ filmData[nextModal].acf.artist_first_name }}
        </h2>
        <h3>{{ filmData[nextModal].acf.artist_country }}</h3>
      </div>
    </button>
  </nav>
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
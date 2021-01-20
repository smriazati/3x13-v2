<template>
  <div class="">hi</div>
</template>

<script>
export default {
    async asyncData ({ store, $axios }) {
        const [aboutRes, filmsRes] = await Promise.all([ 
            $axios.get('https://www.ysdt.org/wp-json/wp/v2/3x13_general/?per_page=1'),
            $axios.get('https://www.ysdt.org/wp-json/wp/v2/3x13films/?per_page=12')
        ])

        // store.commit("content/setAboutData", aboutRes.data);
        // store.commit("content/setFilmsData", filmRes.data);

        return {
            aboutApi: aboutRes.data[0],
            filmsApi: filmsRes.data,
        }
    },
    computed: {
        artistCredits() {
            var ref = this.filmsApi;

            ref.sort(function(a, b) {
                var textA = a.acf.artist_first_name.toUpperCase();
                var textB = b.acf.artist_first_name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            return ref;
        }
    }
}
</script>
export const state = () => ({
    rawDataFilms: '',
    isFilmDataLoaded: false,
    rawDataAbout: '',
    isAboutDataLoaded: false,
    rawDataCredits: '',
    isCreditsDataLoaded: false,
})


export const mutations = {
    setFilmData: (state, payload) => {
        let ref = payload;
        state.rawDataFilms = ref;
        state.isFilmDataLoaded = true;
    },
    setAboutData: (state, payload) => {
        state.rawDataAbout = payload[0];
        state.isAboutDataLoaded = true;
    },
    setCreditsData: (state, payload) => {
        state.rawDataCredits = payload;
        state.isCreditsDataLoaded = true;
    },
}

export const getters = {
    languages: (state) => {
        if (!state.isAboutDataLoaded) {
            return false;
        }

        let rawLanguages = state.rawDataAbout.acf.languages; // object 
        let langCount = parseInt(state.rawDataAbout.acf.language_count); // number 
        let rawLanguagesArray = Object.values(rawLanguages);
        return rawLanguagesArray.slice(0, langCount);
    },
    totalVideos: (state) => {
        return state.rawDataFilms.length
    },
    gridLink: (state) => {
        if (!state.isAboutDataLoaded) {
            return false;
        }
        return state.rawDataAbout.acf.grid_film_private_link;
    },
    filmData: (state) => {
        if (!state.isFilmDataLoaded) {
            return false;
        }

        var ref = state.rawDataFilms.slice();
        // ref.sort((a, b) => parseFloat(a.acf.film_order) - parseFloat(b.acf.film_order));

        ref.sort(function (a, b) {
            return parseFloat(a.acf.film_order) - parseFloat(b.acf.film_order);
        });

        return ref;
    },
    aboutData: (state) => {
        return state.rawDataAbout;
    },
    primaryCredits: (state) => {
        if (!state.isCreditsDataLoaded) {
            return false;
        }
        const credits = state.rawDataCredits;
        var primaryCredits = [];
        credits.forEach((c) => {
            if (c.acf.credit_type === "primary") {
                primaryCredits.push(c);
            }
        });
        primaryCredits.sort(function (a, b) {
            return parseFloat(a.acf.credit_order) - parseFloat(b.acf.credit_order);
        });
        return primaryCredits;
    },
    secondaryCredits: (state) => {
        if (!state.isCreditsDataLoaded) {
            return false;
        }
        const credits = state.rawDataCredits;
        var secondaryCredits = [];
        credits.forEach((c) => {
            if (c.acf.credit_type === "secondary") {
                secondaryCredits.push(c);
            }
        });
        secondaryCredits.sort(function (a, b) {
            return parseFloat(a.acf.credit_order) - parseFloat(b.acf.credit_order);
        });
        return secondaryCredits;
    },
    artistCredits: (state) => {
        if (!state.isFilmDataLoaded) {
            return false;
        }

        var ref2 = state.rawDataFilms.slice();

        ref2.sort(function (a, b) {
            return a.acf.artist_first_name.localeCompare(b.acf.artist_first_name);
        });

        return ref2;
    }
}


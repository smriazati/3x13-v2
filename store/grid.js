export const state = () => ({
    isGridPlaying: false,
    subtitleLanguage: '',
    activeIntroSection: '',
    introSections: [
        'About', 'Credits', 'Tutorial'
    ],
    previouslyActiveModal: null,
    prevModal: null,
    activeModal: null,
    nextModal: null,
    previousFrame: '',
    activeFrame: 'Intro',
    frames: ["Intro", "Film13", "FilmModal", "Tutorial"],
    isFullscreen: false,
    activeModalState: 'player',
    modalStates: ['player', 'tiles'],
    isFilm13Playing: true,
    isFilm13Muted: false
})


export const mutations = {
    activateIntroSection: (state, payload) => {
        state.activeIntroSection = payload;
    },
    deactivateIntroSection: (state) => {
        state.activeIntroSection = null;
    },
    changeModalState: (state, modalState) => {
        state.activeModalState = modalState;
    },
    createPrevNextModalsForReplay: (state) => {
        state.prevModal = 0;
        state.nextModal = 11;
    },
    activateModal: (state, payload) => {
        state.previouslyActiveModal = state.activeModal;
        state.activeModal = payload;

        if (payload === 0) {
            state.prevModal = 11;
            state.nextModal = 1;
        } else if (payload === 11) {
            state.prevModal = 10;
            state.nextModal = 0;
        } else {
            state.prevModal = payload - 1;
            state.nextModal = payload + 1;
        }
    },
    deactivateModal: (state) => {
        state.activeModal = null;
        state.previouslyActiveModal = null;
    },
    changeActiveFrame: (state, payload) => {
        if (payload !== state.activeFrame) {
            state.previousFrame = state.activeFrame;
        }
        state.activeFrame = payload;
    },
    toggleFullscreen: (state) => {
        state.isFullscreen = !state.isFullscreen;
    },
    change: (state, payload) => {
        state.isFullscreen = payload;
    },
    setSubtitle: (state, payload) => {
        state.subtitleLanguage = payload;
    },
    deactivateSubtitle: (state) => {
        state.subtitleLanguage = ''
    },
    toggleFilm13Playback: (state, payload) => {
        state.isFilm13Playing = payload
    },
    toggleFilm13Audio: (state, payload) => {
        state.isFilm13Muted = payload
    },
}

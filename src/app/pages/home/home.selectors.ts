import { createFeatureSelector, createSelector } from "@ngrx/store";



export const selectHomeState = createFeatureSelector<any>('home');

export const selectNowPlayingMovies = createSelector(
    selectHomeState,
    (state) => state.movies.nowPlaying
)

export const selectTrending = createSelector(
    selectHomeState,
    (state) => state.trending
)

export const selectPopularMovies = createSelector(
    selectHomeState,
    (state) => state.movies.popular
)
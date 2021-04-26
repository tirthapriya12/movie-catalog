import { createReducer, on } from '@ngrx/store';
import * as HomeActions from '../actions/home.action'

const initial_state = {
    movies: {
        popular: [],
        nowPlaying: [],
        upcoming: [],
        trailers: []
    },
    tvShows: {
        popular: [],
        streaming: [],
        upcoming: [],
        trailers: []
    }
}
const _homeReducer = createReducer(initial_state,
    on(HomeActions.getPopularMoviesSuccess, (state, action) => {
        return {
            ...state,
            movies: { ...state.movies, popular: action.popularMovies }
        };
    }),
    on(HomeActions.getNowPlayingMoviesSuccess, (state, action) => {
        return {
            ...state,
            movies: { ...state.movies, nowPlaying: action.nowPlaying }
        }
    })
)

export function homeReducer(state: any, action: any) {
    return _homeReducer(state, action);
}
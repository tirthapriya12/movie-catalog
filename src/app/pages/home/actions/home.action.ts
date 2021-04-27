import { createAction, props } from '@ngrx/store';

export const getPopularMovies = createAction('[GET Movie list] Popular Movies');
export const getPopularMoviesSuccess = createAction('[GET Movie list] Popular Movies Success', props<{ popularMovies: any }>());
export const getPopularMoviesFailed = createAction('[GET Movie list] Popular Movies failed', (error: Error) => ({ error: error.toString() }));

export const getNowPlayingMovies = createAction('[GET Movie list] Now Playing Movies');
export const getNowPlayingMoviesSuccess = createAction('[GET Movie list] Now Playing Movies Success', props<{ nowPlaying: any }>());
export const getNowPlayingMoviesFailed = createAction('[GET Movie list] Now Playing Movies Failed', (error: Error) => ({ error: error.toString() }));

export const getTrending = createAction('[GET Trending]');
export const getTrendingSuccess = createAction('[GET Trending] Success', props<{ trending: any }>());
export const getTrendingFailed = createAction('[GET Trending] Failed', (error: Error) => ({ error: error.toString() }));
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { catchError, concatMap, map, switchMap } from "rxjs/operators";
import { MovieDBService } from "src/app/services/movie-db.service";
import * as HomeActions from '../actions/home.action';

@Injectable()
export class HomeEffect {

    constructor(private actions$: Actions, private movieDBSvc: MovieDBService) { }

    getPopularMovies$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(HomeActions.getPopularMovies),
            switchMap((action: any) => this.movieDBSvc.getPopularMovies()),
            map((movies: any) => HomeActions.getPopularMoviesSuccess({ popularMovies: movies })),
            catchError(err => [HomeActions.getPopularMoviesFailed(err)])
        ));

    getNowPlayingMovies$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(HomeActions.getNowPlayingMovies),
            switchMap((action: any) => this.movieDBSvc.getNowPlayingMovies()),
            map((movies: any) => HomeActions.getNowPlayingMoviesSuccess({ nowPlaying: movies })),
            catchError(err => [HomeActions.getNowPlayingMoviesFailed(err)])
        )
    )

    getTrending$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(HomeActions.getTrending),
            switchMap((action: any) => this.movieDBSvc.getTrending()),
            map((trending: any) => HomeActions.getTrendingSuccess({ trending })),
            catchError((err) => [HomeActions.getTrendingFailed(err)])
        ))


}
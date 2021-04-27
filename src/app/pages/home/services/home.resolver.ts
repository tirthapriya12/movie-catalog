import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, first, take, takeLast, tap } from "rxjs/operators";
import { selectHomeState } from "../home.selectors";
import * as HomeActions from '../actions/home.action';

@Injectable()
export class HomeResolver implements Resolve<any> {
    constructor(private store: Store) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.store.pipe(
            select(selectHomeState),
            tap(homeState => {
                if (!homeState.movies.nowPlaying?.length) {
                    this.store.dispatch(HomeActions.getNowPlayingMovies())
                }
                if (!homeState.movies.popular?.length) {
                    this.store.dispatch(HomeActions.getPopularMovies())
                }
                if (!homeState.trending?.length) {
                    this.store.dispatch(HomeActions.getTrending())
                }
            }),
            filter((homeState: any) => {
                const { nowPlaying, popular } = homeState.movies;
                return nowPlaying.length && popular.length && homeState.trending.length
            }), //validator to check if it should resolve
            first()
        )
    }
}
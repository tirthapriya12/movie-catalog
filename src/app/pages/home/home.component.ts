import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { MovieDBService } from '../../services/movie-db.service';
import { getPopularMovies, getNowPlayingMovies } from './actions/home.action';
import { selectNowPlayingMovies, selectPopularMovies, selectTrending } from './home.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  trending$: Observable<any> | any;
  nowPlayingMovies$: Observable<any> | any;
  popularMovies$: Observable<any> | any;

  constructor(private store: Store, private moviedb: MovieDBService, private alertSvc: AlertService, private route: ActivatedRoute) {
    this.trending$ = this.store.pipe(select(selectTrending))
    this.popularMovies$ = this.store.pipe(select(selectPopularMovies));
    this.nowPlayingMovies$ = this.store.pipe(select(selectNowPlayingMovies));
  }


  ngOnInit(): void {
    console.log(this.route.snapshot.data)
  }

  ngOnDestroy(): void {
    this.trending$.unsubscribe();
    this.popularMovies$.unsubscribe();
    this.nowPlayingMovies$.unsubscribe();
  }

}

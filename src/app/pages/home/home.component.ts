import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AlertService } from 'src/app/services/alert.service';
import { MovieDBService } from '../../services/movie-db.service';
import { getPopularMovies, getNowPlayingMovies } from './actions/home.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store, private moviedb: MovieDBService, public alertSvc: AlertService) { }

  ngOnInit(): void {
    this.store.dispatch(getPopularMovies());
    this.store.dispatch(getNowPlayingMovies());
  }

}

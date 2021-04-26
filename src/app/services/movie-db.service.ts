import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MOVIEDB_API } from '../constants/constant';
import { concatMap, take, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MovieDBService {
  tmdbConfig: any;
  constructor(private http: HttpClient) {
    this.fetchConfiguration();
  }

  constructURL(subject: string, query?: { [key: string]: any, appendToResponse?: string }): string {
    let concatStr: string = '';

    if (query) {
      concatStr = Object.keys(query).reduce((prev, curr) => { return prev + '&' + curr + '=' + query[curr] }, concatStr);
    }

    // if (query?.appendToResponse) {
    //   concatStr += '&append_to_response=' + query.appendToResponse;
    // }
    return MOVIEDB_API.BASE_URL + subject + '?api_key=' + MOVIEDB_API.API_KEY + concatStr;
  }

  fetchConfiguration() {
    let query = { append_to_response: 'countries,languages' };
    this.http.get(this.constructURL('configuration', query)).subscribe((config) => {
      console.log(config);
      this.tmdbConfig = config;
    })
  }

  getPopularMovies() {
    let query = {
      region: 'IN', //keeping it constant for now
    }
    return this.http.get(this.constructURL('movie/popular', query)).pipe(map((resp: any) => resp.results));
  }

  getNowPlayingMovies() {
    let query = {
      region: 'IN', //keeping it constant for now
    }
    return this.http.get(this.constructURL('movie/now_playing', query)).pipe(map((resp: any) => resp.results));
  }

  getTrending() {
    return this.http.get(this.constructURL('trending/all/week')).pipe(map((resp: any) => resp.results));
  }


}

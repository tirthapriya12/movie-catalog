import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MOVIEDB_API } from '../constants/constant';
import { map } from 'rxjs/operators';


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

  setImagePaths = (item: any) => {
    const { images } = this.tmdbConfig;
    let base_url = window.location.host.match(/localhost/) ? images.secure_base_url : images.base_url;
    if (item.backdrop_path) {
      item.backdrop_path = (base_url + images.backdrop_sizes[2] + item.backdrop_path).replace(/\/\//g, '/');
    }
    if (item.poster_path) {
      item.poster_path = (base_url + images.poster_sizes[3] + item.poster_path).replace(/\/\//g, '/');
    }
    return item;
  }

  getPopularMovies(region: string = 'IN') {
    let query = {
      region, //keeping it constant for now
    }
    return this.http.get(this.constructURL('movie/popular', query)).pipe(map((resp: any) => resp.results.map(this.setImagePaths)));
  }

  getNowPlayingMovies(region: string = 'IN') {
    let query = {
      region //keeping it constant for now
    }
    return this.http.get(this.constructURL('movie/now_playing', query)).pipe(map((resp: any) => resp.results.map(this.setImagePaths)));
  }

  getTrending() {
    return this.http.get(this.constructURL('trending/all/week')).pipe(map((resp: any) => resp.results.map(this.setImagePaths)));
  }


}

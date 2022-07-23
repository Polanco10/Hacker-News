import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { INews } from '../models/news.models';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {
  }

  //TODO: preguntar el formato fecha

  getNews(parameters: any): Observable<INews> {
    const params = new HttpParams({ fromObject: parameters });
    return this.http.get<INews>('https://hn.algolia.com/api/v1/search_by_date', { params }).pipe(
      map(news => {
        news.hits = news.hits.map(hit => {
          return { ...hit, created_at: new Date(hit.created_at) }
        })
        return { ...news }
      })
    );
  }
}

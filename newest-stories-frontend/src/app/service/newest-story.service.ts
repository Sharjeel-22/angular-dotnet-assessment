import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { NewsItem } from '../model/NewsItem';

@Injectable({
  providedIn: 'root'
})
export class NewestStoryService {
  private BASE_URL = "https://localhost:7120/api/Stories/newest";

  constructor(private http:HttpClient) { }

  getStories(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(this.BASE_URL);
  }

}

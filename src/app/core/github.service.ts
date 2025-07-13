import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const GITHUB_TOKEN = environment.githubToken;

export interface SearchRepoParams {
  term: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  stargazers_count: number;
  language: string;
}

export interface GithubSearchResponse {
  total_count: number;
  items: GithubRepo[];
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  searchRepos(params: SearchRepoParams): Observable<GithubSearchResponse> {
    const query = encodeURIComponent(params.term);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${GITHUB_TOKEN}`
    });

    return this.http.get<GithubSearchResponse>(
      `${this.baseUrl}/search/repositories?q=${query}`,
      { headers }
    );
  }

  searchCommits(repoFullName: string): Observable<any[]> {
    const url = `${this.baseUrl}/repos/${repoFullName}/commits`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${GITHUB_TOKEN}`
    });

    return this.http.get<any[]>(url, { headers });
  }

}
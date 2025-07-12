import { Injectable } from "@angular/core";

interface SearchRepoParams {
    term: string;
}

interface SearchCommitParams {
    repoId: string;
}

@Injectable({ providedIn: 'root'})
export class GithubService {
    searchRepos(params: SearchRepoParams){}
    searchCommits(params: SearchCommitParams){}
}
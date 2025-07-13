import { Injectable, signal } from '@angular/core';
import { GithubRepo } from './github.service';

@Injectable({ providedIn: 'root' })
export class SelectedRepoService {
  private readonly selectedRepo = signal<GithubRepo | null>(null);

  set(repo: GithubRepo) {
    this.selectedRepo.set(repo);
  }

  get(): GithubRepo | null {
    return this.selectedRepo();
  }

  clear() {
    this.selectedRepo.set(null);
  }
}

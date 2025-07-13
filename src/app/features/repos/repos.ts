import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { GithubService, GithubRepo } from '../../core/github.service';
import { SelectedRepoService } from '../../core/selected-repo.service';
import { Router } from '@angular/router';
import { SearchBar } from '../../shared/components/search-bar/search-bar';
import { AppTitle } from '../../shared/components/app-title/app-title';
import { MenuFilterBy } from '../../shared/components/menu-filter-by/menu-filter-by';
import { SearchStateService } from '../../core/search-state.service';

interface RepoListItem {
  avatar: string;
  name: string;
  full_name?: string;
  createdAt: Date;
}

@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DatePipe,
    SearchBar,
    AppTitle,
    MenuFilterBy
  ],
  templateUrl: './repos.html',
  styleUrls: ['./repos.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Repos implements OnInit {
 readonly searchState = inject(SearchStateService); // ✅ ora è pubblica e visibile nel template
  private readonly githubService = inject(GithubService);
  private readonly selectedRepoService = inject(SelectedRepoService);
  private readonly router = inject(Router);

  // Signals
  readonly querySignal = this.searchState.query;
  readonly items = signal<Array<RepoListItem>>([]);
  readonly errorMessage = signal<string | null>(null);
  readonly searchMode = signal<'repositories' | 'issues'>('repositories');

  ngOnInit() {
    const currentQuery = this.searchState.getQueryValue();
    if (currentQuery.trim()) {
      this.fetchRepos(currentQuery);
    }
  }

  onSearchSubmit() {
    const term = this.querySignal(); // ✅ ora è un signal, quindi chiamabile
    if (term.trim()) {
      this.searchState.setQuery(term); // Facoltativo se già aggiornato da queryChange
      this.fetchRepos(term);
    }
  }

  fetchRepos(term: string) {
  const mode = this.searchMode();

  if (mode === 'repositories') {
    this.githubService.searchRepos({ term }).subscribe({
      next: (res) => {
        const mapped = res.items.map((r: GithubRepo) => ({
          avatar: r.owner.avatar_url,
          name: r.name,
          full_name: r.full_name,
          createdAt: new Date(r.created_at)
        }));
        this.items.set(mapped);
        this.errorMessage.set(null);
      },
      error: (err) => this.handleError(err)
    });
  } else if (mode === 'issues') {
    this.githubService.searchIssues(term).subscribe({
      next: (res) => {
        const uniqueReposMap = new Map<string, RepoListItem>();

        res.items.forEach((issue: any) => {
          const repoUrl = issue.repository_url;
          const match = repoUrl.match(/repos\/(.+)$/);
          if (match) {
            const full_name = match[1];
            if (!uniqueReposMap.has(full_name)) {
              uniqueReposMap.set(full_name, {
                name: full_name.split('/')[1],
                full_name,
                avatar: issue.user.avatar_url, // fallback
                createdAt: new Date(issue.created_at)
              });
            }
          }
        });

        this.items.set(Array.from(uniqueReposMap.values()));
      },
      error: (err) => this.handleError(err)
    });
  }
}

handleError(err: any) {
  if (err.status === 403) {
    this.errorMessage.set('GitHub API rate limit exceeded. Please try again later.');
  } else if (err.status === 404) {
    this.errorMessage.set('Results not found.');
  } else {
    this.errorMessage.set('An error occurred while fetching data from GitHub.');
  }
  console.error('Error fetching data from GitHub:', err);
}


  clearFilterHandler(): void {
    this.searchState.setQuery('');
    this.items.set([]);
    this.errorMessage.set(null);
  }

  onRowClick(repo: GithubRepo) {
    this.selectedRepoService.set(repo);
    this.router.navigate(['/commits']);
  }

  onQueryChange(newQuery: string) {
    this.searchState.setQuery(newQuery);
  }

  onFilterChange(mode: 'repositories' | 'issues') {
  this.searchMode.set(mode);
  const term = this.querySignal();
  if (term.trim()) {
    this.fetchRepos(term);
  }
}
}

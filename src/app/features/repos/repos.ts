import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { GithubService, GithubRepo } from '../../core/github.service';
import { SelectedRepoService } from '../../core/selected-repo.service';
import { Router } from '@angular/router';

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
    DatePipe
  ],
  templateUrl: './repos.html',
  styleUrls: ['./repos.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Repos implements OnInit {
  readonly search = signal('angular');
  readonly items = signal<Array<RepoListItem>>([]);
  readonly errorMessage = signal<string | null>(null);

  constructor(
    private githubService: GithubService,
    private selectedRepoService: SelectedRepoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchRepos();
  }

  fetchRepos() {
    this.githubService.searchRepos({ term: this.search() }).subscribe({
      next: (res) => {
        const mapped = res.items.map((r: GithubRepo) => ({
          avatar: r.owner.avatar_url,
          name: r.name,
          full_name: r.full_name,
          createdAt: new Date(r.created_at)
        }));
        this.items.set(mapped);
        this.errorMessage.set(null); // ✅ resetta errore se tutto ok
      },
      error: (err) => {
        if (err.status === 403) {
          this.errorMessage.set('GitHub API rate limit exceeded. Please try again later.');
        } else if (err.status === 404) {
          this.errorMessage.set('Commits not found for this repository.');
        } else {
          this.errorMessage.set('An error occurred while fetching commits from GitHub.');
        }
        console.error('Error fetching commits from GitHub:', err);
      }
    });
  }

  clearFilterHandler(): void {
    this.search.set('');
    this.fetchRepos();
  }

  searchChangeHandler(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.search.set(val);
    this.fetchRepos();
  }

  onRowClick(repo: GithubRepo) {
    this.selectedRepoService.set(repo);
    this.router.navigate(['/commits']);
  }

}

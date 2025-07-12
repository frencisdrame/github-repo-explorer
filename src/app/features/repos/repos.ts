import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { GithubService, GithubRepo } from '../../core/github.service';

interface RepoListItem {
  avatar: string;
  name: string;
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

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.fetchRepos();
  }

  fetchRepos(): void {
    this.githubService.searchRepos({ term: this.search() }).subscribe({
      next: (res) => {
        const mapped = res.items.map((r: GithubRepo) => ({
          avatar: r.owner.avatar_url,
          name: r.full_name,
          createdAt: new Date(r.created_at)
        }));
        this.items.set(mapped);
      },
      error: (err) => {
        console.error('Failed to load repos', err);
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
}

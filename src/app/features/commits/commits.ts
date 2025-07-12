import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { GithubService } from '../../core/github.service';
import { SelectedRepoService } from '../../core/selected-repo.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

interface CommitListItem {
  sha: string;
  message: string;
  author: string;
  date: Date;
}

@Component({
  selector: 'app-commits',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonModule,
    TableModule,
    DatePipe
  ],
  templateUrl: './commits.html',
  styleUrls: ['./commits.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Commits implements OnInit {
  readonly items = signal<CommitListItem[]>([]);
  readonly errorMessage = signal<string | null>(null);

  constructor(
    private githubService: GithubService,
    private selectedRepoService: SelectedRepoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const repo = this.selectedRepoService.get();
    console.log('COMMITS - Selected repo:', repo);
    if (!repo) {
      this.errorMessage.set('Nessun repository selezionato.');
      return;
    }

    this.githubService.searchCommits(repo.full_name).subscribe({
      next: (data) => {
        const mapped = data.map((c) => ({
          sha: c.sha,
          message: c.commit.message,
          author: c.commit.author.name,
          date: new Date(c.commit.author.date),
        }));
        this.items.set(mapped);
        this.errorMessage.set(null); // reset dell'errore in caso di successo
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

  goBack(): void {
    this.router.navigate(['/repos']);
  }

}

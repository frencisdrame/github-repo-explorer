import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

interface RepoListItem {
  avatar: string;
  name: string
  createdAt: Date
}

@Component({
  selector: 'app-repos',
  imports: [ButtonModule, TableModule, DatePipe, FormsModule],
  templateUrl: './repos.html',
  styleUrl: './repos.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Repos {
  readonly search = signal('');
  readonly items = signal<Array<RepoListItem>>([{
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    name: 'octocat/Hello-World',
    createdAt: new Date('2011-01-26T19:01:12Z')
  }, {
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
    name: 'octocat/Spoon-Knife',
    createdAt: new Date('2011-01-26T19:01:12Z')
  }])


  clearFilterHandler() {
    //reset
  }
  searchChangeHandler(event: Event) {
    if (!event?.target) {
      return;
    }
    const searchTerm = (event.target as unknown as HTMLInputElement).value;
    console.log(searchTerm);
    // this.#store.filterBySearch(searchTerm)
  }
}

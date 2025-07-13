import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppTitle } from '../../shared/components/app-title/app-title';     
import { SearchBar} from '../../shared/components/search-bar/search-bar';
import { SearchStateService } from '../../core/search-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBar, AppTitle],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  private searchState = inject(SearchStateService);
  private router = inject(Router);

  query = this.searchState.getQueryValue();


  onSearch() {
    console.log('home Search query:', this.query);
   this.searchState.setQuery(this.query);
  this.router.navigate(['/repos']);
  }

}

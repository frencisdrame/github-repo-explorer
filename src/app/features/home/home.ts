import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppTitle } from '../../shared/components/app-title/app-title';     
import { SearchBar} from '../../shared/components/search-bar/search-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBar, AppTitle],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  searchQuery = '';

  constructor(
    private router: Router
  ) {}

  onSearchChange(query: string) {
    this.searchQuery = query;
  }

  onSearchSubmit() {
    const trimmed = this.searchQuery.trim();
    if (trimmed) {
      this.router.navigate(['/repos']); // 🔹 nessun query param
    }
  }

}

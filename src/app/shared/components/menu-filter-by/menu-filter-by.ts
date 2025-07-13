import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-menu-filter-by',
  imports: [CommonModule, ButtonModule],
  templateUrl: './menu-filter-by.html',
  styleUrl: './menu-filter-by.scss'
})
export class MenuFilterBy {
  selected: 'repositories' | 'issues' = 'repositories';

  @Output() filterChange = new EventEmitter<'repositories' | 'issues'>();

  select(filter: 'repositories' | 'issues') {
    this.selected = filter;
    this.filterChange.emit(filter);
  }
}

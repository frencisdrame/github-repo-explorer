import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss']
})
export class SearchBar {
  @Input() query: string = '';
  @Output() queryChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.queryChange.emit(value);
  }
}

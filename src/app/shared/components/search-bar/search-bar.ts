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
  @Output() enter = new EventEmitter<void>();

  onInputChange(event: Event) {
    console.log('SearchBar - Input changed:', (event.target as HTMLInputElement).value);
    const value = (event.target as HTMLInputElement).value;
    this.queryChange.emit(value);
  }

  onSubmit() {
    console.log('SearchBar - Search submitted:', this.query);
    this.enter.emit();
  }
}
